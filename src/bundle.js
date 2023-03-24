"use strict";
(() => {
  // src/circle.ts
  var Circle = class {
    constructor(ctx2, radius = 30, x = 0, y = 0, currentColor = "black") {
      this.fillColor = "black";
      this.strokeColor = this.fillColor;
      this.ctx = ctx2;
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.fillColor = currentColor;
      this.update();
    }
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
      this.ctx.closePath();
    }
    update() {
      this.ctx.fillStyle = this.fillColor;
      this.ctx.strokeStyle = "rgba(0,0,0,0)";
      this.draw();
    }
    updatePosition(x, y) {
      this.x = x;
      this.y = y;
    }
    checkInside(ray) {
      if ((ray.p1.x - this.x) ** 2 + (ray.p1.y - this.y) ** 2 <= this.radius ** 2) {
        return true;
      } else {
        return false;
      }
    }
  };

  // src/ray.ts
  var Ray = class {
    constructor(p1, p2) {
      this.p1 = { x: 0, y: 0 };
      this.p2 = { x: 0, y: 0 };
      this.rayExtension = (distance2 = 1500) => {
        let normal = this.normalize();
        let xPos = this.p2.x + distance2 * normal.x;
        let yPos = this.p2.y + distance2 * normal.y;
        this.p2 = { x: xPos, y: yPos };
      };
      this.getAngle = () => {
        let a = this.p2.x - this.p1.x;
        let b = this.p2.y - this.p1.y;
        let radians = Math.atan2(b, a);
        return radians;
      };
      this.p1 = p1 === void 0 ? this.p1 : p1;
      this.p2 = p2 === void 0 ? this.p2 : p2;
    }
    distance() {
      return Math.sqrt((this.p2.x - this.p1.x) ** 2 + (this.p2.y - this.p1.y) ** 2);
    }
    slope() {
      if (this.p1.x - this.p2.x != 0) {
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
  };

  // src/line.ts
  var Line = class extends Ray {
    constructor(ctx2, p1, p2, currentColor = "black") {
      super(p1, p2);
      this.ctx = ctx2;
      this.currentColor = currentColor;
      this.update();
    }
    draw() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.p1.x, this.p1.y);
      this.ctx.lineTo(this.p2.x, this.p2.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    update() {
      this.ctx.strokeStyle = this.currentColor;
      this.draw();
    }
    updatePosition(p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
    }
    checkInside() {
      return null;
    }
  };

  // src/linear_operations.ts
  var distance = (p1, p2) => {
    return Math.floor(Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2));
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
  var toRad = (degrees) => {
    return degrees * Math.PI / 180;
  };
  var toDeg = (radians) => {
    return radians * 180 / Math.PI;
  };

  // src/polygon.ts
  var Polygon = class {
    constructor(ctx2, sides = 3, position, radius) {
      this.sides = 3;
      this.radius = 10;
      this.lines = [];
      this.vertices = [];
      this.position = { x: 0, y: 0 };
      this.ctx = ctx2;
      this.position = position;
      this.sides = sides;
      if (radius)
        this.radius = radius;
      this.createPoints();
      this.update();
    }
    draw() {
      this.ctx.beginPath();
      this.ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
      for (let i = 1; i < this.vertices.length; i++) {
        let pos = this.vertices[i];
        this.ctx.lineTo(pos.x, pos.y);
      }
      this.ctx.closePath();
      this.ctx.stroke();
    }
    createPoints() {
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / this.sides) {
        let posX = Math.cos(angle + 5) * this.radius + this.position.x;
        let posY = Math.sin(angle + 5) * this.radius + this.position.y;
        this.vertices.push({ x: posX, y: posY });
      }
    }
    getLines() {
      let lines = [];
      let p1 = this.vertices[0];
      let p2 = this.vertices[this.vertices.length - 1];
      lines.push(new Ray(p1, p2));
      for (let i = 0; i < this.vertices.length - 1; i++) {
        p1 = this.vertices[i];
        p2 = this.vertices[i + 1];
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
    updatePosition(points) {
      this.vertices = points;
    }
    update() {
      this.ctx.strokeStyle = "rgba(0,0,0,0)";
      this.draw();
    }
  };

  // src/particles.ts
  var Particles = class {
    constructor(ctx2, center = { x: 0, y: 0 }) {
      this.rays = [];
      this.lines = [];
      this.angles = [];
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
        return uniquePoints;
      };
      this.findClosest = (walls) => {
        let intersects = [];
        for (let ray of this.rays) {
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
          }
        }
        return intersects;
      };
      this.ctx = ctx2;
      this.center = center;
      this.update();
    }
    update() {
      for (let line of this.lines) {
        line.update();
      }
    }
    calcIntersects(walls, pointer = { x: 0, y: 0 }, radius = 15, color) {
      let transforms = [];
      for (let wall of walls) {
        if (wall instanceof Polygon) {
          let rays = wall.getLines();
          transforms.push(...rays);
        } else {
          transforms.push(wall);
        }
      }
      let uPoints = this.getUniquePoints(transforms);
      this.lines = [];
      this.rays = [];
      for (let i = 0; i < uPoints.length; i++) {
        let pos = uPoints[i];
        let ray = new Ray(pointer, pos);
        let magnitude = ray.distance();
        let angle = ray.getAngle();
        let leftRayEnd = {
          x: magnitude * Math.cos(angle - 1e-5) + pointer.x,
          y: magnitude * Math.sin(angle - 1e-5) + pointer.y
        };
        let rightRayEnd = {
          x: magnitude * Math.cos(angle + 1e-5) + pointer.x,
          y: magnitude * Math.sin(angle + 1e-5) + pointer.y
        };
        let rightRay = new Ray(pointer, rightRayEnd);
        let leftRay = new Ray(pointer, leftRayEnd);
        leftRay.rayExtension();
        rightRay.rayExtension();
        this.rays.push(leftRay, ray, rightRay);
      }
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI * 2 / 40) {
        let posX = Math.cos(angle) * radius;
        let posY = Math.sin(angle) * radius;
        let spanRay = new Ray(pointer, {
          x: posX + pointer.x,
          y: posY + pointer.y
        });
        spanRay.rayExtension();
        this.rays.push(spanRay);
      }
      let intersects = this.findClosest(transforms);
      for (let intersect of intersects) {
        let line = new Line(this.ctx, pointer, intersect, "rgba(0,0,0,0)");
        this.lines.push(line);
      }
      this.drawSightPolygon(color);
    }
    drawSightPolygon(color) {
      let angles = [];
      this.ctx.fillStyle = color;
      for (let line of this.lines) {
        angles.push({ line, angle: line.getAngle() });
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
    // Need if light rays are static
    updateRays(pointer, pos) {
      for (let i = 0; i < pos.length; i++) {
        this.rays[i].p1 = pointer;
        this.rays[i].p2 = pos[i];
      }
    }
  };

  // src/pointer_light.ts
  var MAX_ANGLE = 55;
  var PointerLightRay = class {
    constructor(ctx2, position = { x: 0, y: 0 }) {
      this.rays = [];
      this.initialRays = [];
      this.lines = [];
      this.position = { x: 0, y: 0 };
      this.calcIntersects = (walls, pointer) => {
        this.lines = [];
        let transforms = [];
        for (let wall of walls) {
          if (wall instanceof Polygon) {
            let rays = wall.getLines();
            transforms.push(...rays);
          } else {
            transforms.push(wall);
          }
        }
        let intersects = this.findClosest(transforms);
        for (let intersect of intersects) {
          let line = new Line(this.ctx, pointer, intersect, "rgba(232,232,254,0)");
          this.lines.push(line);
        }
        this.drawSightPolygon("rgba(232,232,254,0.5)");
      };
      this.findClosest = (walls) => {
        let intersects = [];
        for (let ray of this.rays) {
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
          }
        }
        return intersects;
      };
      this.ctx = ctx2;
      this.position = position;
      this.createRays();
      this.update();
    }
    draw() {
      for (let line of this.lines) {
        line.update();
      }
    }
    lookAt(startPointer, mouse) {
      let pointerRay = new Ray(startPointer, mouse);
      let rayPos = [];
      this.rays = [];
      let offset = MAX_ANGLE / 2;
      for (let ray of this.initialRays) {
        if (ray) {
          let angle = toDeg(pointerRay.getAngle());
          let pos = { x: ray.p2.x - ray.p1.x, y: ray.p2.y - ray.p1.y };
          let xPrime = pos.x * Math.cos(toRad(angle - offset)) - pos.y * Math.sin(toRad(angle - offset));
          let yPrime = pos.y * Math.cos(toRad(angle - offset)) + pos.x * Math.sin(toRad(angle - offset));
          rayPos.push({ x: xPrime + ray.p1.x, y: yPrime + ray.p1.y });
        }
      }
      for (let i = 0; i < rayPos.length; i++) {
        if (rayPos[i]) {
          let extender = new Ray(startPointer, rayPos[i]);
          this.rays.push(extender);
        }
      }
    }
    createRays() {
      for (let angle = 0; angle <= MAX_ANGLE; angle += 0.1) {
        let radians = angle * Math.PI / 180;
        let posX = Math.cos(radians) + this.position.x;
        let posY = Math.sin(radians) + this.position.y;
        let ray = new Ray(this.position, {
          x: posX,
          y: posY
        });
        ray.rayExtension();
        this.initialRays.push(ray);
      }
    }
    updatePosition(sourcePoint, point) {
      for (let i = 0; i < this.initialRays.length; i++) {
        this.initialRays[i].p1 = sourcePoint;
        this.initialRays[i].p2 = point[i];
      }
    }
    update() {
      this.draw();
      this.ctx.stroke();
    }
    drawSightPolygon(color) {
      let angles = [];
      this.ctx.fillStyle = color;
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = "rgba(232,232,254,1)";
      for (let line of this.lines) {
        angles.push({ line, angle: line.getAngle() });
      }
      this.ctx.beginPath();
      this.ctx.moveTo(angles[0].line.p2.x, angles[0].line.p2.y);
      for (let i = 1; i < angles.length; i++) {
        this.ctx.lineTo(angles[i].line.p2.x, angles[i].line.p2.y);
      }
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.lineTo(
        angles[angles.length - 1].line.p2.x,
        angles[angles.length - 1].line.p2.y
      );
      this.ctx.lineTo(
        angles[angles.length - 1].line.p1.x,
        angles[angles.length - 1].line.p1.y
      );
      this.ctx.fill();
      this.ctx.closePath();
    }
  };

  // src/world.ts
  var canvas = document.getElementById(
    "container"
  );
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  var polygons = [
    new Polygon(ctx, 3, { x: 300, y: 400 }, 40),
    new Polygon(ctx, 4, { x: 700, y: 100 }, 60),
    new Polygon(ctx, 5, { x: 800, y: 600 }, 80),
    new Polygon(ctx, 3, { x: canvas.width / 2, y: canvas.height / 2 }, 100),
    new Polygon(ctx, 5, { x: 100, y: 650 }, 100),
    new Polygon(ctx, 7, { x: 1300, y: 300 }, 80),
    new Polygon(ctx, 4, { x: 110, y: 150 }, 100),
    new Polygon(ctx, 4, { x: 900, y: 500 }, 200),
    new Line(ctx, { x: 0, y: 0 }, { x: canvas.width, y: 0 }, "black"),
    new Line(ctx, { x: 0, y: 0 }, { x: 0, y: canvas.height }, "black"),
    new Line(
      ctx,
      { x: 0, y: canvas.height },
      { x: canvas.width, y: canvas.height },
      "black"
    ),
    new Line(
      ctx,
      { x: canvas.width, y: 0 },
      { x: canvas.width, y: canvas.height },
      "black"
    )
  ];
  var circle = new Circle(ctx, 15, canvas.width / 2, canvas.height / 2, "gray");
  var Collections = [];
  Collections.push(...polygons);
  Collections.push(circle);
  var circlePointer = { x: circle.x, y: circle.y };
  var particles = [];
  for (let i = 0; i < 12; i++) {
    particles.push(new Particles(ctx, circlePointer));
  }
  var pLight = new PointerLightRay(ctx, { x: 500, y: 450 });
  var dLight = new PointerLightRay(ctx, circlePointer);
  var mousePointer = { x: 0, y: 0 };
  var checkHit = (scanRay) => {
    for (let entity of Collections) {
      let hit = entity.checkInside(scanRay);
      if (hit)
        return entity;
    }
  };
  var drag = (event) => {
    let scanRay = new Ray(
      { x: event.offsetX, y: event.offsetY },
      { x: event.offsetX + 10, y: event.offsetY }
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
    } else if (initialEntity instanceof Circle) {
      initialCirclePosition = {
        x: initialPoint.x - initialEntity.x,
        y: initialPoint.y - initialEntity.y
      };
      for (let ray of dLight.initialRays) {
        initialPosition = {
          x: initialPoint.x - ray.p2.x,
          y: initialPoint.y - ray.p2.y
        };
        initialPositions.push(initialPosition);
      }
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
      } else if (initialEntity instanceof Circle) {
        let posX = offsetX - initialCirclePosition.x;
        let posY = offsetY - initialCirclePosition.y;
        initialEntity.updatePosition(posX, posY);
        for (let position of initialPositions) {
          translate.push({ x: offsetX - position.x, y: offsetY - position.y });
        }
        dLight.updatePosition({ x: posX, y: posY }, translate);
      }
    };
    canvas.addEventListener("mousemove", move);
    canvas.onmouseup = () => {
      canvas.removeEventListener("mousemove", move);
      canvas.onmouseup = null;
    };
  };
  var draw = () => {
    dLight.update();
    pLight.update();
    circle.update();
    for (let polygon of polygons) {
      polygon.update();
    }
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
  var update = (timestamp) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dLight.lookAt(circlePointer, { x: 0, y: 0 });
    dLight.calcIntersects(polygons, circlePointer);
    dLight.lookAt({ x: 80, y: 140 }, { x: 500, y: 300 });
    dLight.calcIntersects(polygons, { x: 80, y: 140 });
    displayFPS();
    draw();
    requestAnimationFrame(update);
  };
  canvas.addEventListener("mousemove", (event) => {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;
    circlePointer = { x: circle.x, y: circle.y };
    mousePointer = { x: mouseX, y: mouseY };
  });
  canvas.addEventListener("mousedown", drag);
  requestAnimationFrame(update);
})();
