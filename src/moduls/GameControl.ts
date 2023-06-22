// 引入其他类
import Snake from './Snake';
import Food from './Food';
import ScorePanrl from './ScorePanel';

// 游戏控制器，控制其他所有类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    // 食物
    food: Food;
    // 记分牌
    scorePanel: ScorePanrl;

    // 创建一个属性来存储蛇移动的方向（按键方向）
    direction: string = '';
    // 创建一个属性用来记录游戏是否结束
    isLive = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanrl(10,2);

        this.init();
    }

    // 游戏的初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 调用run方法使蛇移动
        this.run();
    }

    // 创建键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        // 检查event.key的值是否合法（用户是否按了正确的按键）
        // 修改direction属性
        this.direction = event.key;
    }

    // 创建一个控制蛇移动的方法
    run() {
        /* 
            根据方向（this.direction）来使蛇的位置改变
        */
        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                Y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                Y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                X -= 10;
                break;
            case "ArrowRight":
            case "Right":
                X += 10;
                break;
        }


        // 检查是否吃到了食物
        this.checkEat(X, Y);

        // 修改蛇的坐标
        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            // 进入到catch，说明出现异常，游戏结束，弹出提示
            alert((e as any).message + "GAME OVER!");
            // 将islive没有设置为false
            this.isLive = false;
        }

        // 开启定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物的位置进行重置
            this.food.change();
            // 分数增加
            this.scorePanel.addScore();
            // 蛇要增加一节
            this.snake.addBody();
        }
    }

}

export default GameControl;