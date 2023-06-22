class Snake {
    // 表示蛇头的元素
    head: HTMLElement;
    // 蛇的身体（包括蛇头）
    bodies: HTMLCollection;
    // 获取蛇的容器
    element: HTMLElement;

    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('#snake>div') as HTMLElement;
        this.bodies = this.element.getElementsByTagName('div');
    }

    // 获取蛇头的坐标
    get X() {
        return this.head.offsetLeft;
    }

    get Y() {
        return this.head.offsetTop;
    }

    // 设置蛇头的坐标
    set X(value) {

        if (this.X === value) {
            return;
        }
        // X值是否合法
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙
            throw new Error('蛇撞墙了');
        }

        // 修改x值时，是在修改水平坐标，蛇左右移动，向左不能向右掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // 如果发生了掉头，让蛇向反方向继续移动
            if (value > this.X) {
                // 如果新的value大于旧值x，则说明蛇在向右走，此时发生掉头，蛇继续向左走
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
        }

        // 移动身体
        this.moveBody();
        this.head.style.left = value + 'px';
        // 检查是否撞到身体
        this.checkHeadBody();
    }

    set Y(value) {

        if (this.Y === value) {
            return;
        }
        // Y值是否合法
        if (value < 0 || value > 290) {
            // 进入判断说明蛇撞墙
            throw new Error('蛇撞墙了');
        }
        // 修改Y值时，是在修改垂直坐标，蛇上下移动，不能调头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            // 如果发生了掉头，让蛇向反方向继续移动
            if (value > this.Y) {
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
        }
        // 移动身体
        this.moveBody();
        this.head.style.top = value + 'px';
        // 检查是否撞到身体
        this.checkHeadBody();
    }

    // 蛇增加身体的方法
    addBody() {
        // 向element中添加一个div
        this.element.insertAdjacentHTML('beforeend', "<div></div>");
    }

    // 添加一个蛇身体移动的方法
    moveBody() {
        // 将后面的身体设置为前面的身体的位置
        for (let i = this.bodies.length - 1; 0 < i; i--) {
            // 获取前面身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            // 将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 检查头和身体有没有相撞
    checkHeadBody(){
        // 获取所有的身体，检查是否和蛇头坐标发生碰撞
        for(let i=1;i<this.bodies.length;i++){
            if(this.X===(this.bodies[i]as HTMLElement).offsetLeft&&this.Y===(this.bodies[i]as HTMLElement).offsetTop){
                // 进入判断说明蛇头撞到了身体，游戏结束
                throw new Error("撞到自己了");
            }
        }
    }
}

export default Snake;