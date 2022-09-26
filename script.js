/*
1. Выбрать поле для игры +
2. Заполнить игровое поле карточками (тегами li) +
3. Сделать клик по карточками +
4. Сделать переворачивание карточек +
    4.1. Размещаем картинки для каждой карточки +
    4.2. показываем картинку +
5. Если выбраны 2 картинки - проверяем на совпадение
    5.1. Если картинки совпадают, то удаляем карточки
    5.2. Перевернуть все выбраные карточки
6. Если все карточки удалены - вывести окно с перезапуском игры.
7. При клике на кнопку "перезагрузить" - обновляем страницу.
*/

var cardsField = document.querySelector("#cards");
var resetBlock = document.querySelector("#reset");
var resetBtn = document.querySelector("#reset-btn")
// console.dir(cardsField);
console.dir(resetBtn)
// сколько мы карточек хотим создать
var countCards = 16;

// создали коробку с размещением наших картинок (Массив)
var images = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    1, 2, 3, 4,
    5, 6, 7, 8
];

var deletedCards = 0;
var selected = [];

var pause = false;


// кол-во итераций 
for (var i = 0; i < countCards; i = i + 1) {
    var li = document.createElement("li");
// задаем айди всем Ли. первій Ли = итератору, дальше - по условию (і +1)
    li.id = i;
    cardsField.appendChild(li);
}

console.dir(cardsField);

// при клике на карточку задаем событие. Наше событие - менять цвет карточки на зеленый
cardsField.onclick = function (event) {
    if (pause == false) {
     var element = event.target;
// прописуем условия, чтобі клик работал только на Li
    if (element.tagName == "LI" && element.className != "active") {
        selected.push(element);

        element.className = "active";

        var img = images[element.id];
// смена фона на картинку (конкатинация)
        element.style.backgroundImage = "url(images/" + img + ".png)";
        if (selected.length == 2) {
            pause = true;
// проверяем совпадение карточек по имени
            if (images[selected[0].id] == images[selected[1].id]) {
// скрываем 2 совпадающих картинки
                selected[0].style.visibility = "hidden";
                selected[1].style.visibility = "hidden";
                deletedCards = deletedCards + 2;
            }
            setTimeout(refreshCards, 600);
            
        }
    }
    }
    
}


// очищаем идентификатор эктив и переворачиваем карточку, для тех что выбирали уже
function refreshCards() {
    for (var i = 0; i < countCards; i = i + 1) {
        cardsField.children[i].className = "";
        cardsField.children[i].style.backgroundImage = 'url("images/back.png")';
    }
    if (deletedCards == countCards) {
        resetBlock.style.display = "block";
    }
    selected = [];
    pause = false;
}

resetBtn.onclick = function () {
    location.reload();
}