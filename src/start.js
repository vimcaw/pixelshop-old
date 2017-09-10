import {$} from './element';

$('#welcome-openFromLocal').addEventListener('click', function () {
    $('#menu-openFromLocal').click();
    $('#welcome').addClass('hide');
});

$('#welcome-openFromUrl').addEventListener('click', function () {
    $('#menu-openFromUrl').click();
    $('#welcome').addClass('hide');
});

function createRecentFile(src, fileName, date) {
    let $li = document.createElement('li'),
        $div = document.createElement('div'),
        $img = document.createElement('img'),
        $fileName = document.createElement('p'),
        $date = document.createElement('p');
    $img.src = src;
    $div.className = 'info';
    $fileName.innerText = fileName;
    $fileName.className = 'file-name';
    $date.innerText = date;
    $date.className = 'date';
    $div.appendChild($fileName);
    $div.appendChild($date);
    $li.appendChild($img);
    $li.appendChild($div);
    $('.recent-file ul').appendChild($li);
}
