"use strict";
(() => {
  // src/linear_operations.ts
  var distance = (p1, p2) => {
    return Math.floor(Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2));
  };
  var distanceFloat = (p1, p2) => {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  };
  var checkLineCollision = (lineA, lineB) => {
    let intersectionX, intersectionY;
    let x1, x2, x3, x4, y1, y2, y3, y4;
    x1 = lineA.p1.x;
    x2 = lineA.p2.x;
    y1 = lineA.p1.y;
    y2 = lineA.p2.y;
    x3 = lineB.p1.x;
    x4 = lineB.p2.x;
    y3 = lineB.p1.y;
    y4 = lineB.p2.y;
    let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator == 0) {
      return false;
    }
    let pA = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    let pB = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denominator;
    if (pA >= 0 && pA <= 1 && pB >= 0 && pB <= 1) {
      intersectionX = x1 + pA * (x2 - x1);
      intersectionY = y1 + pA * (y2 - y1);
      return { x: intersectionX, y: intersectionY };
    } else {
      return false;
    }
  };
  var checkPointCircleCollision = (pt, circle) => {
    let dist = distanceFloat(circle.center, pt);
    if (dist <= circle.radius) {
      return true;
    } else {
      return false;
    }
  };
  var checkLinePointCollision = (line, point) => {
    let lineLength = line.distance();
    let dist1 = distanceFloat(point, line.p1);
    let dist2 = distanceFloat(point, line.p2);
    let buffer = 0.1;
    if (dist1 + dist2 >= lineLength - buffer && dist1 + dist2 <= lineLength + buffer) {
      return true;
    } else {
      return false;
    }
  };
  var checkLineCircleCollision = (line, circle) => {
    let inside1 = checkPointCircleCollision(line.p1, circle);
    let inside2 = checkPointCircleCollision(line.p2, circle);
    if (inside1)
      return line.p1;
    if (inside2)
      return line.p2;
    let lineDistance = line.distance();
    let dot2 = dotCircle(line, circle) / lineDistance ** 2;
    let p1 = line.p1;
    let p2 = line.p2;
    let closest = { x: p1.x + dot2 * (p2.x - p1.x), y: p1.y + dot2 * (p2.y - p1.y) };
    let onSegment = checkLinePointCollision(line, closest);
    if (!onSegment)
      return false;
    let c = circle.center;
    let dist = distanceFloat(c, closest);
    if (dist <= circle.radius) {
      return closest;
    } else {
      return false;
    }
  };
  var dotCircle = (line, circle) => {
    let c = circle.center;
    let p1 = line.p1;
    let p2 = line.p2;
    return (c.x - p1.x) * (p2.x - p1.x) + (c.y - p1.y) * (p2.y - p1.y);
  };
  var toRad = (degrees) => {
    return degrees * Math.PI / 180;
  };
  var toDeg = (radians) => {
    return radians * 180 / Math.PI;
  };
  var getAngle = (p1, p2) => {
    let a = p2.x - p1.x;
    let b = p2.y - p1.y;
    let radians = Math.atan2(b, a);
    return radians;
  };

  // src/ray.ts
  var Ray = class {
    constructor(p1, p2) {
      this.p1 = { x: 0, y: 0 };
      this.p2 = { x: 0, y: 0 };
      this.p1 = p1 === void 0 ? this.p1 : p1;
      this.p2 = p2 === void 0 ? this.p2 : p2;
    }
    distance() {
      return Math.sqrt((this.p2.x - this.p1.x) ** 2 + (this.p2.y - this.p1.y) ** 2);
    }
    slope() {
      if (this.p1.x - this.p2.x !== 0) {
        return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
      }
      return Number.MAX_VALUE;
    }
    normalize() {
      let normalX = this.p2.x - this.p1.x;
      let normalY = this.p2.y - this.p1.y;
      let normalLength = this.distance();
      normalX = normalX / normalLength;
      normalY = normalY / normalLength;
      return { x: normalX, y: normalY };
    }
    rayExtension(distance2 = 1500) {
      let normal = this.normalize();
      let xPos = this.p2.x + distance2 * normal.x;
      let yPos = this.p2.y + distance2 * normal.y;
      this.p2 = { x: xPos, y: yPos };
    }
    getRayAngle() {
      return getAngle(this.p1, this.p2);
    }
    getXComponent() {
      return this.p2.x - this.p1.x;
    }
    getYComponent() {
      return this.p2.y - this.p1.y;
    }
    getXYComponents() {
      return { x: this.p2.x - this.p1.x, y: this.p2.y - this.p1.y };
    }
  };

  // src/polygon.ts
  var Polygon = class {
    constructor(ctx2, sides = 3, position, radius = 10, strokeColor = "cyan") {
      this.sides = 3;
      this.angle = 0;
      // In degrees
      this.radius = 10;
      this.lines = [];
      this.rotPos = [];
      this.vertices = [];
      this.fillColor = "rgba(0,0,0,0)";
      this.strokeColor = "rgba(0,0,0,0)";
      this.position = { x: 0, y: 0 };
      this.ctx = ctx2;
      this.sides = sides;
      this.radius = radius;
      this.position = position;
      this.strokeColor = strokeColor;
      this.createPoints();
      this.position = this.getCenterPosition();
      this.update();
    }
    draw(vertices) {
      vertices = vertices === void 0 ? this.vertices : vertices;
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.beginPath();
      this.ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        let pos = vertices[i];
        this.ctx.lineTo(pos.x, pos.y);
      }
      this.ctx.closePath();
      this.ctx.stroke();
    }
    createPoints() {
      for (let angle = 0; angle <= 360; angle += Math.floor(360 / this.sides)) {
        let radians = toRad(angle);
        let posX = Math.cos(radians) * this.radius + this.position.x;
        let posY = Math.sin(radians) * this.radius + this.position.y;
        this.vertices.push({ x: posX, y: posY });
      }
    }
    getLines() {
      let lines = [];
      let p1 = this.rotPos[0];
      let p2 = this.rotPos[this.rotPos.length - 1];
      lines.push(new Ray(p1, p2));
      for (let i = 0; i < this.rotPos.length - 1; i++) {
        p1 = this.rotPos[i];
        p2 = this.rotPos[i + 1];
        let line = new Ray(p1, p2);
        lines.push(line);
      }
      return lines;
    }
    checkInside(ray) {
      let count = 0;
      let sides = this.getLines();
      for (let side of sides) {
        let hit = checkLineCollision(ray, side);
        if (hit) {
          count++;
        }
      }
      return count & 1;
    }
    checkShellHit(circle) {
      let sides = this.getLines();
      for (let side of sides) {
        let intersect = checkLineCircleCollision(side, circle);
        if (intersect) {
          return { side, intersect };
        }
      }
    }
    updatePosition(points) {
      this.vertices = points;
    }
    update() {
      this.position = this.getCenterPosition();
      this.rotate();
    }
    getCenterPosition() {
      if (this.sides == 3) {
        return {
          x: (this.vertices[0].x + this.vertices[1].x + this.vertices[2].x) / 3,
          y: (this.vertices[0].y + this.vertices[1].y + this.vertices[2].y) / 3
        };
      }
      let signedArea = 0;
      let centerX = 0;
      let centerY = 0;
      for (let i = 0; i < this.sides; i++) {
        let x0 = this.vertices[i].x;
        let y0 = this.vertices[i].y;
        let x1 = this.vertices[(i + 1) % this.sides].x;
        let y1 = this.vertices[(i + 1) % this.sides].y;
        let A = x0 * y1 - x1 * y0;
        signedArea += A;
        centerX += (x0 + x1) * A;
        centerY += (y0 + y1) * A;
      }
      signedArea *= 0.5;
      centerX /= 6 * signedArea;
      centerY /= 6 * signedArea;
      return { x: centerX, y: centerY };
    }
    rotate() {
      this.rotPos = [];
      for (let point of this.vertices) {
        if (point) {
          let pos = {
            x: point.x - this.position.x,
            y: point.y - this.position.y
          };
          let xPrime = pos.x * Math.cos(toRad(this.angle)) - pos.y * Math.sin(toRad(this.angle));
          let yPrime = pos.y * Math.cos(toRad(this.angle)) + pos.x * Math.sin(toRad(this.angle));
          this.rotPos.push({
            x: xPrime + this.position.x,
            y: yPrime + this.position.y
          });
        }
      }
      this.draw(this.rotPos);
    }
  };

  // src/circle.ts
  var Circle = class {
    constructor(radius = 1, x = 0, y = 0) {
      this.center = { x: 0, y: 0 };
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.center = { x, y };
    }
  };
  var RenderCircle = class {
    constructor(ctx2, radius = 30, x = 0, y = 0, currentColor = "black", strokeColor = "rgba(0,0,0,0)") {
      this.fillColor = "black";
      this.strokeColor = this.fillColor;
      this.ctx = ctx2;
      this.fillColor = currentColor;
      this.strokeColor = strokeColor;
      this.circle = new Circle(radius, x, y);
      this.update();
    }
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.circle.x, this.circle.y, this.circle.radius, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
    }
    update() {
      this.ctx.fillStyle = this.fillColor;
      this.ctx.strokeStyle = this.strokeColor;
      this.draw();
    }
    updatePosition(x, y) {
      this.circle.x = x;
      this.circle.y = y;
      this.circle.center = { x, y };
    }
    checkInside(ray) {
      if ((ray.p1.x - this.circle.x) ** 2 + (ray.p1.y - this.circle.y) ** 2 <= this.circle.radius ** 2) {
        return true;
      } else {
        return false;
      }
    }
  };

  // src/lights/directional_light.ts
  var DirectLight = class {
    constructor(ctx2, position = { x: 0, y: 0 }, startAngle = 0, endAngle = 1, lightColor = "cyan", increment = 0.1, rayLength = 500, drawExtenders = true) {
      this.endAngle = 1;
      this.startAngle = 0;
      this.increment = 0.1;
      this.rayLength = 500;
      this.rays = [];
      this.lightColor = "cyan";
      this.rotRays = [];
      this.drawExtenders = true;
      this.sceneWalls = [];
      this.position = { x: 0, y: 0 };
      this.findClosest = (walls, rays) => {
        rays = rays === void 0 ? this.rays : rays;
        let intersects = [];
        for (let ray of rays) {
          let closest = null;
          let max = Number.MAX_VALUE;
          for (let wall of walls) {
            let hit = checkLineCollision(ray, wall);
            if (hit) {
              const dist = distance(ray.p1, hit);
              if (dist < max && dist !== 0) {
                max = dist;
                closest = hit;
              }
            }
          }
          if (closest) {
            intersects.push(closest);
          } else if (this.drawExtenders) {
            intersects.push(ray.p2);
          }
        }
        return intersects;
      };
      this.ctx = ctx2;
      this.endAngle = endAngle;
      this.position = position;
      this.increment = increment;
      this.rayLength = rayLength;
      this.lightColor = lightColor;
      this.startAngle = startAngle;
      this.drawExtenders = drawExtenders;
      this.createRays(position);
    }
    // Create rays between a starting angle and ending angle
    createRays(position) {
      for (let angle = this.startAngle; angle <= this.endAngle; angle += this.increment) {
        let radians = toRad(angle);
        let posX = Math.cos(radians) + position.x;
        let posY = Math.sin(radians) + position.y;
        let ray = new Ray(position, {
          x: posX,
          y: posY
        });
        ray.rayExtension(this.rayLength);
        this.rays.push(ray);
      }
    }
    updatePosition(sourcePoint) {
      this.position = sourcePoint;
      for (let i = 0; i < this.rays.length; i++) {
        let distance2 = this.rays[i].distance();
        let normal = this.rays[i].normalize();
        let pos = {
          x: sourcePoint.x + distance2 * normal.x,
          y: sourcePoint.y + distance2 * normal.y
        };
        this.rays[i].p1 = sourcePoint;
        this.rays[i].p2 = pos;
      }
    }
    calcIntersects(walls, position, rays) {
      position = position === void 0 ? this.position : position;
      rays = rays === void 0 ? this.rays : rays;
      let sightLines = [];
      let intersects = this.findClosest(walls, rays);
      for (let intersect of intersects) {
        let line = new Ray(position, intersect);
        sightLines.push(line);
      }
      this.drawSightPolygon(sightLines);
    }
    drawSightPolygon(lines) {
      let angles = [];
      this.ctx.fillStyle = this.lightColor;
      for (let line of lines) {
        angles.push({ line, angle: line.getRayAngle() });
      }
      this.ctx.beginPath();
      this.ctx.moveTo(angles[0].line.p2.x, angles[0].line.p2.y);
      for (let i = 1; i < angles.length; i++) {
        this.ctx.lineTo(angles[i].line.p2.x, angles[i].line.p2.y);
      }
      this.ctx.lineTo(
        angles[angles.length - 1].line.p2.x,
        angles[angles.length - 1].line.p2.y
      );
      this.ctx.lineTo(
        angles[angles.length - 1].line.p1.x,
        angles[angles.length - 1].line.p1.y
      );
      this.ctx.closePath();
      this.ctx.fill();
    }
    rotate(walls, angle = 0) {
      this.rotRays = [];
      for (let ray of this.rays) {
        if (ray) {
          let pos = { x: ray.p2.x - ray.p1.x, y: ray.p2.y - ray.p1.y };
          let xPrime = pos.x * Math.cos(toRad(angle)) - pos.y * Math.sin(toRad(angle));
          let yPrime = pos.y * Math.cos(toRad(angle)) + pos.x * Math.sin(toRad(angle));
          let rotationalRay = new Ray(ray.p1, { x: xPrime + ray.p1.x, y: yPrime + ray.p1.y });
          this.rotRays.push(rotationalRay);
        }
      }
      this.calcIntersects(walls, this.position, this.rotRays);
    }
    lookAt(walls, trackPoint) {
      let trackAngle = getAngle(this.position, trackPoint);
      this.rotate(walls, toDeg(trackAngle));
    }
  };

  // src/reflectors.ts
  var MAX_RAYS = 10;
  var Reflectors = class {
    constructor(ctx2, starter = new Ray(
      { x: 0, y: 0 },
      { x: 0, y: 0 }
    ), strokeColor = "red") {
      this.strokeColor = "red";
      this.reflectorRays = [];
      this.findReflection = (line, ray, iX, iY) => {
        let normal = line.normalize();
        let rayX = ray.p1.x - iX;
        let rayY = ray.p1.y - iY;
        let dotProduct = rayX * normal.x + rayY * normal.y;
        let dotNormalX = dotProduct * normal.x;
        let dotNormalY = dotProduct * normal.y;
        let reflectedRayX = ray.p1.x - dotNormalX * 2;
        let reflectedRayY = ray.p1.y - dotNormalY * 2;
        return { x: reflectedRayX, y: reflectedRayY };
      };
      this.ctx = ctx2;
      this.starter = starter;
      this.strokeColor = strokeColor;
    }
    // Calculates the number of possible hits for reflections
    calculateHits(walls, ray) {
      ray = ray === void 0 ? new Ray() : ray;
      let starterRay = ray;
      let reflectorRay = new Ray();
      let hit = this.findClosest(walls, this.starter);
      let prevHit = hit;
      let nextHit = null;
      let rays = [];
      if (hit[0] && hit[1]) {
        for (let i = 0; i < MAX_RAYS - 1; i++) {
          let closestHit = prevHit[0];
          let closestWall = prevHit[1];
          if (closestHit) {
            if (rays.length === 0) {
              starterRay.p2 = closestHit;
              rays.push(starterRay);
            } else {
              starterRay = new Ray(rays[i - 1].p2, closestHit);
              rays.push(starterRay);
            }
            let rPoints = this.findReflection(
              closestWall,
              rays[i],
              closestHit.x,
              closestHit.y
            );
            reflectorRay = new Ray(closestHit, rPoints);
            reflectorRay.rayExtension();
          }
          nextHit = this.findClosest(walls, reflectorRay);
          prevHit = nextHit;
        }
        rays.push(reflectorRay);
      } else if (rays.length === 0) {
        rays.push(this.starter);
      }
      this.reflectorRays = rays;
      this.drawReflections(rays);
    }
    drawReflections(rays) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.strokeColor;
      let start2 = rays[0].p1;
      let end = rays[0].p2;
      this.ctx.moveTo(start2.x, start2.y);
      this.ctx.lineTo(end.x, end.y);
      for (let i = 1; i < rays.length; i++) {
        start2 = rays[i].p1;
        end = rays[i].p2;
        this.ctx.moveTo(start2.x, start2.y);
        this.ctx.lineTo(end.x, end.y);
      }
      this.ctx.closePath();
      this.ctx.stroke();
    }
    findClosest(walls, ray) {
      let closest = null;
      let closestWall = null;
      let max = Number.MAX_VALUE;
      for (let wall of walls) {
        let hit = checkLineCollision(ray, wall);
        if (hit) {
          const dist = distance(ray.p1, hit);
          if (dist < max && dist !== 0) {
            max = dist;
            closest = hit;
            closestWall = wall;
          }
        }
      }
      return [closest, closestWall];
    }
  };

  // src/projectiles/laser.ts
  var Laser = class extends Reflectors {
    constructor(ctx2, starter) {
      super(ctx2, starter);
      this.damage = 0.25;
    }
    damageShip(ships) {
      for (let reflector of this.reflectorRays) {
        if (Array.isArray(ships)) {
          for (let ship2 of ships) {
            if (ship2.checkHit(reflector)) {
              if (ship2.durability > -1) {
                ship2.durability -= this.damage;
                ship2.redCol += this.damage * 10;
                ship2.greenCol -= this.damage * 2;
                ship2.centerCircle.fillColor = `rgb(${ship2.redCol}, ${ship2.greenCol}, 0)`;
              }
            }
          }
        } else {
          if (ships.checkHit(reflector)) {
            if (ships.durability > -1) {
              ships.durability -= this.damage;
              ships.centerCircle.fillColor = `rgb(55, ${ships.durability + 100}, 0)`;
            }
          }
        }
      }
    }
  };

  // src/ship.ts
  var Ship = class extends Polygon {
    constructor(ctx2, addLight = false, position = { x: 0, y: 0 }, mass = 1, sides = 3, radius = 10, shipColor = "cyan", playerControlled = false) {
      super(ctx2, sides, position, radius, shipColor);
      this.mass = 1;
      this.speed = 0;
      this.maxSpeed = 10;
      this.turnSpeed = 0.4;
      this.durability = 100;
      this.redCol = 55;
      this.greenCol = this.durability + 100;
      this.shipColor = "cyan";
      this.playerControlled = false;
      this.velocity = { x: 0, y: 0 };
      this.force = { x: 0, y: 0 };
      this.mass = mass;
      let healthColor = `rgb(${this.redCol}, ${this.greenCol}, 0)`;
      this.centerCircle = new RenderCircle(
        ctx2,
        this.radius / 5,
        this.position.x,
        this.position.y,
        healthColor
      );
      this.laser = new Laser(ctx2, new Ray());
      this.playerControlled = playerControlled;
      if (addLight) {
        this.shipLight = new DirectLight(ctx2, this.position, -45, 45, "cyan", 0.1, 500);
      } else {
        this.shipLight = null;
      }
    }
    checkHit(ray) {
      let sides = this.getLines();
      for (let side of sides) {
        let hit = checkLineCollision(ray, side);
        if (hit) {
          return true;
        }
      }
    }
    lookAt(trackPoint) {
      if (this.durability > 0) {
        let pointerRay = new Ray(this.position, trackPoint);
        let angle = toDeg(pointerRay.getRayAngle());
        this.angle = angle;
      }
    }
    move(keys2) {
      if (keys2.w.pressed) {
        for (let i = 0; i < this.vertices.length; i++) {
          if (this.speed <= this.maxSpeed) {
            this.speed += 1e-3;
          }
        }
      }
      if (keys2.s.pressed) {
        for (let i = 0; i < this.vertices.length; i++) {
          if (this.speed >= -1) {
            this.speed -= 1e-3;
          }
        }
      }
      if (keys2.a.pressed) {
        for (let i = 0; i < this.vertices.length; i++) {
          this.angle -= this.turnSpeed * 0.7;
        }
      }
      if (keys2.d.pressed) {
        for (let i = 0; i < this.vertices.length; i++) {
          this.angle += this.turnSpeed * 0.7;
        }
      }
    }
    fire(mouseKey2, walls, ships) {
      if (mouseKey2.mousedown.pressed) {
        let posX = Math.cos(toRad(this.angle)) * 10 + this.rotPos[0].x;
        let posY = Math.sin(toRad(this.angle)) * 10 + this.rotPos[0].y;
        let pos = { x: posX, y: posY };
        let starterRay = new Ray(this.rotPos[0], pos);
        starterRay.rayExtension(1500);
        this.laser.starter.p1 = starterRay.p1;
        this.laser.starter.p2 = starterRay.p2;
        this.laser.calculateHits(walls, starterRay);
        this.laser.damageShip(ships);
      }
    }
    updateSimulation(deltaTime2 = 1e-3, cameraOffset) {
      let posX = Math.cos(toRad(this.angle)) * this.speed + this.position.x;
      let posY = Math.sin(toRad(this.angle)) * this.speed + this.position.y;
      let forceVector = new Ray(this.position, { x: posX, y: posY });
      let xSpeed = (forceVector.p2.x - forceVector.p1.x) / this.mass;
      let ySpeed = (forceVector.p2.y - forceVector.p1.y) / this.mass;
      this.velocity.x += xSpeed;
      this.velocity.y += ySpeed;
      let vt = { x: this.velocity.x * deltaTime2, y: this.velocity.y * deltaTime2 };
      for (let i = 0; i < this.vertices.length; i++) {
        this.vertices[i].x += vt.x;
        this.vertices[i].y += vt.y;
        this.rotPos[i].x += vt.x;
        this.rotPos[i].y += vt.y;
      }
      let center = this.getCenterPosition();
      this.centerCircle.update();
      if (this.playerControlled) {
        this.centerCircle.updatePosition(this.position.x + cameraOffset.x, this.position.y + cameraOffset.y);
      } else {
        this.centerCircle.updatePosition(center.x + vt.x, center.y + vt.y);
      }
      if (this.durability < 0) {
        this.strokeColor = "grey";
        this.speed = 0;
        this.angle = 0;
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
    }
    drawShipLight(walls) {
      var _a, _b;
      (_a = this.shipLight) == null ? void 0 : _a.updatePosition(
        {
          x: this.rotPos[0].x,
          y: this.rotPos[0].y
        }
      );
      (_b = this.shipLight) == null ? void 0 : _b.rotate(walls, this.angle);
    }
    translateCamera(camera2) {
      camera2.updatePosition({
        x: -this.position.x + this.ctx.canvas.width / 2 + this.velocity.x * 1e-3,
        y: -this.position.y + this.ctx.canvas.height / 2 + this.velocity.y * 1e-3
      });
    }
  };

  // src/camera.ts
  var Rectangle = class {
    constructor(startPoint, width, height) {
      this.topLeftPos = { x: 0, y: 0 };
      this.topRightPos = { x: 0, y: 0 };
      this.bottomRightPos = { x: 0, y: 0 };
      this.bottomLeftPos = { x: 0, y: 0 };
      this.width = 0;
      this.height = 0;
      this.topLeftPos = startPoint;
      this.topRightPos = { x: startPoint.x + width, y: startPoint.y };
      this.bottomRightPos = { x: startPoint.x + width, y: startPoint.y + height };
      this.bottomLeftPos = { x: startPoint.x, y: startPoint.y + height };
      this.width = width;
      this.height = height;
    }
    updatePosition(startPoint) {
      this.topLeftPos = startPoint;
      this.topRightPos = { x: startPoint.x + this.width, y: startPoint.y };
      this.bottomRightPos = { x: startPoint.x + this.width, y: startPoint.y + this.height };
      this.bottomLeftPos = { x: startPoint.x, y: startPoint.y + this.height };
    }
  };

  // src/lights/point_light.ts
  var PointLight = class extends DirectLight {
    constructor(ctx2, center = { x: 0, y: 0 }, lightColor = "cyan") {
      super(ctx2, center, 0, 360, lightColor, 1, 1500, true);
      this.uniquePoints = [];
      this.getUniquePoints = (walls) => {
        let pts = [];
        walls.forEach((wall) => {
          pts.push(wall.p1, wall.p2);
        });
        let set = {};
        const uniquePoints = pts.filter((p) => {
          let key = p.x + "," + p.y;
          if (key in set) {
            return false;
          } else {
            set[key] = true;
            return true;
          }
        });
        this.uniquePoints = uniquePoints;
      };
      this.ctx = ctx2;
      this.position = center;
    }
    getUniqueRays(position) {
      for (let i = 0; i < this.uniquePoints.length; i++) {
        let pos = this.uniquePoints[i];
        let ray = new Ray(position, pos);
        let magnitude = ray.distance();
        let angle = ray.getRayAngle();
        let leftRayEnd = {
          x: magnitude * Math.cos(angle - 1e-5) + position.x,
          y: magnitude * Math.sin(angle - 1e-5) + position.y
        };
        let rightRayEnd = {
          x: magnitude * Math.cos(angle + 1e-5) + position.x,
          y: magnitude * Math.sin(angle + 1e-5) + position.y
        };
        let rightRay = new Ray(position, rightRayEnd);
        let leftRay = new Ray(position, leftRayEnd);
        leftRay.rayExtension();
        rightRay.rayExtension();
        this.rays.push(leftRay, ray, rightRay);
      }
    }
    drawSightPolygon(lines) {
      let angles = [];
      this.ctx.fillStyle = this.lightColor;
      for (let line of lines) {
        angles.push({ line, angle: line.getRayAngle() });
      }
      angles = angles.sort((a, b) => {
        return a.angle - b.angle;
      });
      this.ctx.beginPath();
      this.ctx.moveTo(angles[0].line.p2.x, angles[0].line.p2.y);
      for (let i = 1; i < angles.length; i++) {
        this.ctx.lineTo(angles[i].line.p2.x, angles[i].line.p2.y);
      }
      this.ctx.fill();
      this.ctx.closePath();
    }
    // If the walls are moving we have to get the new vertex positions and rebuild all the rays
    // Incorrect, this should be renamed calculate hits.
    calculateHits(walls, position) {
      position = position === void 0 ? this.position : position;
      this.rays = [];
      this.getUniquePoints(walls);
      this.getUniqueRays(position);
      this.createRays(position);
      this.calcIntersects(walls);
    }
  };

  // src/world.ts
  var canvas = document.getElementById(
    "container"
  );
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var camera = new Rectangle({ x: 0, y: 0 }, canvas.width, canvas.height);
  var polygons = [
    new Ship(ctx, void 0, { x: 120, y: 330 }, 2, 3, 25, "red"),
    new Ship(ctx, void 0, { x: 121, y: 330 }, 5, 3, 12, "magenta"),
    new Ship(ctx, void 0, { x: 122, y: 330 }, 3, 3, 12, "yellow"),
    new Ship(ctx, void 0, { x: 123, y: 330 }, 2.5, 3, 20, "blue"),
    new Ship(ctx, void 0, { x: 124, y: 330 }, 1, 3, 11, "green"),
    new Ship(ctx, void 0, { x: 125, y: 330 }, 8, 3, 8, "orange"),
    new Polygon(ctx, 3, { x: 300, y: 400 }, 40),
    new Polygon(ctx, 4, { x: 700, y: 100 }, 60),
    new Polygon(ctx, 5, { x: 800, y: 600 }, 80),
    new Polygon(ctx, 5, { x: 100, y: 650 }, 100),
    new Polygon(ctx, 7, { x: 1300, y: 300 }, 80),
    new Polygon(ctx, 4, { x: 110, y: 150 }, 100),
    new Polygon(ctx, 4, { x: 900, y: 500 }, 200),
    new Polygon(ctx, 5, { x: 2e3, y: 500 }, 200)
  ];
  var getWalls = (sceneWalls) => {
    let walls = [];
    for (let wall of sceneWalls) {
      if (wall instanceof Polygon) {
        let rays = wall.getLines();
        walls.push(...rays);
      } else {
        walls.push(wall);
      }
    }
    return walls;
  };
  var shipArray = [];
  var getShips = () => {
    for (let poly of polygons) {
      if (poly instanceof Ship) {
        shipArray.push(poly);
      }
    }
    return shipArray;
  };
  getShips();
  var ship = new Ship(
    ctx,
    true,
    { x: canvas.width / 2, y: canvas.height / 2 },
    1,
    3,
    50,
    void 0,
    true
  );
  var renderCircle = new RenderCircle(ctx, 15, canvas.width / 2, canvas.height / 2, "gray");
  var Collections = [];
  Collections.push(...polygons);
  Collections.push(renderCircle);
  var circlePointer = { x: renderCircle.circle.x, y: renderCircle.circle.y };
  var pointLight = new PointLight(ctx, circlePointer, "rgba(0,255,255,0.5)");
  var directLight = new DirectLight(ctx, circlePointer, -30, 30);
  var mousePointer = { x: 0, y: 0 };
  var startRay = new Ray({ x: 0, y: 0 }, { x: 1400, y: 1440 });
  var laser = new Laser(ctx, startRay);
  var checkHit = (scanRay) => {
    for (let entity of Collections) {
      let hit = entity.checkInside(scanRay);
      if (hit)
        return entity;
    }
  };
  var drag = (event) => {
    let scanRay = new Ray(
      {
        x: event.offsetX - camera.topLeftPos.x,
        y: event.offsetY - camera.topLeftPos.y
      },
      {
        x: event.offsetX + 10 - camera.topLeftPos.x,
        y: event.offsetY - camera.topLeftPos.y
      }
    );
    let initialPoint = { x: event.offsetX, y: event.offsetY };
    let initialPosition;
    let initialCirclePosition;
    scanRay.rayExtension();
    let initialEntity = checkHit(scanRay);
    let initialPositions = [];
    if (initialEntity && initialEntity instanceof Polygon) {
      for (let vertex of initialEntity.vertices) {
        initialPosition = {
          x: initialPoint.x - vertex.x,
          y: initialPoint.y - vertex.y
        };
        initialPositions.push(initialPosition);
      }
    } else if (initialEntity instanceof RenderCircle) {
      initialCirclePosition = {
        x: initialPoint.x - initialEntity.circle.x,
        y: initialPoint.y - initialEntity.circle.y
      };
    }
    const move = (event2) => {
      let offsetX = event2.offsetX;
      let offsetY = event2.offsetY;
      let translate = [];
      if (initialEntity && initialEntity instanceof Polygon) {
        for (let position of initialPositions) {
          translate.push({ x: offsetX - position.x, y: offsetY - position.y });
        }
        initialEntity.updatePosition(translate);
      } else if (initialEntity instanceof RenderCircle) {
        let posX = offsetX - initialCirclePosition.x;
        let posY = offsetY - initialCirclePosition.y;
        initialEntity.updatePosition(posX, posY);
      }
    };
    canvas.addEventListener("mousemove", move);
    canvas.onmouseup = () => {
      canvas.removeEventListener("mousemove", move);
      canvas.onmouseup = null;
    };
  };
  var draw = () => {
    ship.update();
    for (let polygon of polygons) {
      polygon.update();
      polygon.checkShellHit(renderCircle.circle);
    }
    renderCircle.update();
  };
  var frameTime = 0;
  var lastLoop = performance.now();
  var displayFPS = () => {
    let thisLoop = performance.now();
    let thisFrameTime = thisLoop - lastLoop;
    frameTime += (thisFrameTime - frameTime) / 100;
    lastLoop = thisLoop;
    let frames = (1e3 / frameTime).toFixed(0) + " FPS";
    ctx.fillStyle = "cyan";
    ctx.font = "normal 28px Arial";
    ctx.fillText(frames, canvas.width - 140, 40);
  };
  var start;
  var deltaTime = 1e-3;
  var update = (timestamp) => {
    if (!start)
      start = timestamp;
    const elapsed = timestamp - start;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let mouseCamOffset = {
      x: mousePointer.x - camera.topLeftPos.x,
      y: mousePointer.y - camera.topLeftPos.y
    };
    displayFPS();
    ship.move(keys);
    ship.lookAt(mouseCamOffset);
    ship.updateSimulation(deltaTime, camera.topLeftPos);
    ship.translateCamera(camera);
    ctx.translate(camera.topLeftPos.x, camera.topLeftPos.y);
    laser.calculateHits(getWalls(polygons));
    pointLight.calculateHits(getWalls(polygons));
    ship.fire(mouseKey, getWalls(polygons), shipArray);
    for (let ship2 of shipArray) {
      ship2.updateSimulation(deltaTime, camera.topLeftPos);
      ship2.speed = 5;
      ship2.lookAt(mouseCamOffset);
    }
    draw();
    requestAnimationFrame(update);
  };
  canvas.addEventListener("mousemove", (event) => {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;
    circlePointer = { x: renderCircle.circle.x, y: renderCircle.circle.y };
    mousePointer = { x: mouseX, y: mouseY };
  });
  var mouseKey = {
    mousedown: {
      pressed: false
    }
  };
  var keys = {
    w: {
      pressed: false
    },
    s: {
      pressed: false
    },
    a: {
      pressed: false
    },
    d: {
      pressed: false
    }
  };
  canvas.addEventListener("mousedown", drag);
  window.addEventListener("mousedown", (mouseEvent) => {
    switch (mouseEvent.type) {
      case "mousedown":
        mouseKey.mousedown.pressed = true;
        break;
    }
  });
  window.addEventListener("mouseup", (mouseEvent) => {
    switch (mouseEvent.type) {
      case "mouseup":
        mouseKey.mousedown.pressed = false;
        break;
    }
  });
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
        keys.w.pressed = true;
        break;
      case "s":
        keys.s.pressed = true;
        break;
      case "a":
        keys.a.pressed = true;
        break;
      case "d":
        keys.d.pressed = true;
        break;
    }
  });
  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "w":
        keys.w.pressed = false;
        break;
      case "s":
        keys.s.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "d":
        keys.d.pressed = false;
        break;
    }
  });
  requestAnimationFrame(update);
})();
