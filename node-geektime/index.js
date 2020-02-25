var playerAction = process.argv[2];
var random = Math.random() * 3;
var computerAction = '石头';

if (random > 2) {
    computerAction = '布';
} else if (random < 1) {
    computerAction = '剪刀';
}

console.log('电脑：' + computerAction);
console.log('你：' + playerAction);

if (playerAction === computerAction) {
    console.log("平局");

} else if (
    (playerAction === '剪刀' && computerAction === '布') ||
    (playerAction === '布' && computerAction === '石头') ||
    (playerAction === '石头' && computerAction === '剪刀')
) {
    console.log('恭喜，你赢了');

} else {
    console.log('真遗憾，你输了');
}