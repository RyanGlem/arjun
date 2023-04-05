class Rectangle {
  left = 0;
  top = 0;
  width = 0;
  height = 0;
  right = 0;
  bottom = 0;

  constructor(left: number, top: number, width: number, height: number) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  set(left: number, top: number, width?: number, height?: number) {
    this.left = left;
    this.top = top;
    this.width = width || this.width;
    this.height = height || this.height;
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
  }

  within(r: Rectangle) {
    return (
      r.left <= this.left &&
      r.right >= this.right &&
      r.top <= this.top &&
      r.bottom >= this.bottom
    );
  }

  overlaps(r: Rectangle) {
    return (
      this.left < r.right &&
      r.left < this.right &&
      this.top < r.bottom &&
      r.top < this.bottom
    );
  }
}

const AXIS = {NONE: 1,
    HORIZONTAL: 2,
    VERTICAL: 3,
    BOTH: 4}

export class Camera {
  ctx: CanvasRenderingContext2D;
  xView = 0;
  yView = 0;
  viewportWidth = 0;
  viewportHeight = 0;
  followed : any = null;
  xDeadZone = 0;
  yDeadZone = 0;
  viewportRect: Rectangle;
  worldRect: Rectangle;
  axis = {};

  // Image references my own canvas that I'm currently drawing to the screen
  //drawImage (image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  constructor(
    ctx: CanvasRenderingContext2D,
    xView = 0,
    yView = 0,
    viewportWidth: number,
    viewportHeight: number,
    worldWidth: number,
    worldHeight: number
  ) {
    this.ctx = ctx;
    this.xView = xView;
    this.yView = yView;
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;

    this.viewportRect = new Rectangle(
      this.xView,
      this.yView,
      this.viewportWidth,
      this.viewportHeight
    );

    this.axis = AXIS.BOTH
    this.worldRect = new Rectangle(0, 0, worldWidth, worldHeight);
  }

  draw() {}

  
  follow(gameObject: any, xDeadZone = 0, yDeadZone = 0) {
    this.followed = gameObject;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  }
  update() {
    if (this.followed != null) {
        if (this.axis == AXIS.HORIZONTAL || this.axis == AXIS.BOTH) {
          // moves camera on horizontal axis based on followed object position
          if (this.followed.x - this.xView + this.xDeadZone > this.viewportWidth)
            this.xView = this.followed.x - (this.viewportWidth - this.xDeadZone);
          else if (this.followed.x - this.xDeadZone < this.xView)
            this.xView = this.followed.x - this.xDeadZone;
  
        }
        if (this.axis == AXIS.VERTICAL || this.axis == AXIS.BOTH) {
          // moves camera on vertical axis based on followed object position
          if (this.followed.y - this.yView + this.yDeadZone > this.viewportHeight)
            this.yView = this.followed.y - (this.viewportHeight - this.yDeadZone);
          else if (this.followed.y - this.yDeadZone < this.yView)
            this.yView = this.followed.y - this.yDeadZone;
        }
      }
        this.viewportRect.set(this.xView, this.yView)
      // don't let camera leaves the world's boundary
    if (!this.viewportRect.within(this.worldRect)) {
        if (this.viewportRect.left < this.worldRect.left)
          this.xView = this.worldRect.left;
        if (this.viewportRect.top < this.worldRect.top)
          this.yView = this.worldRect.top;
        if (this.viewportRect.right > this.worldRect.right)
          this.xView = this.worldRect.right - this.viewportWidth;
        if (this.viewportRect.bottom > this.worldRect.bottom)
          this.yView = this.worldRect.bottom - this.viewportHeight;
      }
  }
}
