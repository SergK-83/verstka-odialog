$(document).ready(function () {

    //
    $('.main-header__search-opener').on('click', function () {
        $(this).closest('.main-header__search-wrap').addClass('main-header__search-wrap_show');
    });

    $('.main-header__search-close').on('click', function () {
        $(this).closest('.main-header__search-wrap').removeClass('main-header__search-wrap_show');
    });

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // mask for phone
    $('.input-phone').inputmask({ "mask": "+7 ( 999 ) 999 - 99 - 99"});

    // slick slider
    $('.main-banner__slider').slick({
        dots: true,
        dotsClass: 'main-banner__slider-slick-dots',
        arrows: false,
        infinite: true,
        fade: true,
        speed: 500,
        cssEase: 'linear',
        pauseOnHover: true,
        autoplay: true,
        autoplaySpeed: 5000
    });

    let sliderOrganizations = $('#sliderOrganizations');
    let timerStartSlider;

    sliderOrganizations.slick({
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        speed: 3000,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 0,
        variableWidth: true
    });

    // On swipe event
    sliderOrganizations.on('swipe', function(event, slick, direction){

        sliderOrganizations.slick('slickSetOption', {
            infinite: false,
            autoplay: false,
            speed: 100
        }, true);

        sliderOrganizations.slick('slickPause');

        clearTimeout(timerStartSlider);

        timerStartSlider = setTimeout(function(){sliderOrganizations.slick('slickSetOption', {
            infinite: true,
            autoplay: true,
            speed: 3000
        }, true)}, 5000);
    });
    
    // collapsed text for mobile
    $(document).on('click', '.descr-mobile-collapsed__action', function () {
        $(this).closest('.descr-mobile-collapsed').toggleClass('descr-mobile-collapsed_active');
    });

    // init popover
    $('.card-list_advantages [data-toggle="popover"]').popover({
        viewport: { selector: '.card-list_advantages', padding: 0 }
    });

    // отметка для checkbox-custom
    $(".checkbox-custom").on("click", "input", function() {
        $(this).closest(".checkbox-custom").toggleClass("active");
    });

    // отметка для kg-radio-custom
    $(document).on("click", ".radio-custom label", function () {
        $(this).closest(".radio-custom-list").find('.radio-custom').removeClass("radio-custom_active");
        $(this).closest('.radio-custom').addClass("radio-custom_active");
    });

    // блокировние элементов формы
    $(document).on('change', '.form-onoff__switcher', function () {
        let onoffElement = $(this).closest('.form-onoff').find('.form-onoff__content');

        if (!onoffElement.prop('disabled')) {
            onoffElement.prop('disabled', true);
            onoffElement.addClass('form-onoff__content_disabled');
        } else {
            onoffElement.prop('disabled', false);
            onoffElement.removeClass('form-onoff__content_disabled');
        }
    });

    //
    $('.form-onoff-intruder').on('change', '.form-onoff__switcher', function () {
        let onoffElement = $(this).closest('.form-onoff').find('.form-onoff__content');

        if (!onoffElement.prop('disabled')) {
            onoffElement.val('Нарушитель не изветсен');
        } else {
            onoffElement.val('');
        }
    });

    // Анимационное заполнение placeholder. Значение берем из атрибута data-placeholder
    (function( $ ){

        $.fn.printPlaceholder = function(interval) {

            this.each(function () {
                let placeholderInput = $(this);
                let placeholderStr = placeholderInput.attr("data-placeholder");

                function printPlaceholderInterval() {
                    let i = 0;
                    let flag = true;
                    let placeholderNew = '';
                    let timerId = setInterval(function() {
                        if (flag) {
                            if (i < 0) {
                                i = 0;
                            }
                            placeholderNew += placeholderStr[i];
                            placeholderInput.attr("placeholder", placeholderNew);
                            if (i === placeholderStr.length - 1) {
                                flag = false;
                            }
                            i++;
                        } else {
                            placeholderNew = placeholderInput.attr("placeholder").substring(0, i);
                            placeholderInput.attr("placeholder", placeholderNew);
                            if (i === 0) {
                                flag = true;
                            }
                            i--;
                        }
                    }, interval);

                    placeholderInput.on('focus', function () {
                        clearInterval(timerId);
                        placeholderInput.attr("placeholder", "");
                    });

                    placeholderInput.on('blur', function () {
                        printPlaceholderInterval(interval);
                    });
                }

                printPlaceholderInterval(interval);
            });
        };
    })( jQuery );

    $('.placeholder-input').printPlaceholder(100);

    // проверка email
    function isValidEmail(email) {
        if (email.trim() != '') {
            let pattern = /\S+@\S+\.\S+/;

            if ( !pattern.test(email) ) {
                return false;

            } else {
                return true;
            }

        } else {
            return false;
        }
    }

    $('input[type="email"]').on('input', function () {
        let inputEmail = $(this);
        let emailVal = $(this).val();

        if ( isValidEmail(emailVal) ) {
            inputEmail.closest('.form-group').removeClass('has-error');
            inputEmail.next('.help-block').text('');

        } else {
            inputEmail.closest('.form-group').addClass('has-error');
            inputEmail.next('.help-block').text('* Заполните корректно адрес электронной почты');
        }
    });

    let substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            let matches, substringRegex;

            matches = [];

            substrRegex = new RegExp(q, 'i');

            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });

            cb(matches);
        };
    };

    let city = ['Москва', 'Красноярск', 'Краснодар', 'Санкт-Питербург'];

    $('#the-basics .typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
        },
        {
            name: 'city',
            source: substringMatcher(city)
        });

    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy'
    });

    // проверка полей, обязательных для заполнения, при вводе данных
    $(document).on("input", "input[data-require='true'], select[data-require='true'], textarea[data-require='true']", function() {
        if ($(this).val().trim() != "") {
            $(this).closest('.form-group').removeClass("has-error");
            $(this).next(".text-danger").remove();
        } else if (!$(this).hasClass("has-error")){
            $(this).closest('.form-group').addClass("has-error");
            $(this).after(`<small class="text-danger">Поле обязательное для заполнения</small>`);
        }
    });

    //
    $('.toggle-anonymity').on('click', function () {
        let toggleFieldset = $(this).next('fieldset');

        $(this).toggleClass('active');

        if ( toggleFieldset.prop('disabled') ) {
            toggleFieldset.prop('disabled', false);
        } else {
            toggleFieldset.prop('disabled', true);
        }
    });

    // Добавление добавляемого блока формы
    $(document).on('click', '.adding-item .action-add', function () {
        let addingElement = $(this).closest('.adding-item').clone();

        addingElement.find('.form-control').val('');
        $(this).closest('.adding-item-list').append(addingElement);
    });

    // Удаление добавляемого блока
    $(document).on('click', '.adding-item .action-remove', function () {
        $(this).closest('.adding-item').remove();
    });

    // Удаление миниатюры заявления
    $(document).on('click', '.declaration-card__remove', function () {
        $(this).closest('.declaration-card').remove();
    });

    // Просмотр миниатюры заявления
    $('#declarationFancyBox .declaration-card__scale').fancybox();

    $(document).on('click', '.declaration-card__scale', function (e) {
        e.stopPropagation();
    });

    // Выбор миниатюры заявления
    $(document).on('click', '.declaration-card_select', function () {
        $(this).closest('.declaration-card').toggleClass('declaration-card_active declaration-card_disabled');

        // Удаление демо анимации клика
        $(this).closest('.declaration-list').find('.demo-click__cursor').remove();
    });

    // Добавление блока ввода комментария при нажатии на "Ответить"
    $(document).on('click', '.comment .comment__link-answer', function () {
        let blockComment = $(this).closest('.comment');

        if ( !blockComment.find('.input-comment-answer').length ) {
            blockComment.closest('.comment-list').find('.input-comment-answer').remove();

            blockComment.find('.comment__body').append(`<div class="input-comment input-comment-answer">
                                        <div class="input-comment__body">
                                            <div class="input-comment__field">
                                                <img class="input-comment__icon" src="img/icon-user-circle.png" alt="">
                                                <textarea name="" rows="3" class="form-control" placeholder="Оставить комментарий"></textarea>
                                            </div>
                                            <button class="btn btn-default btn-sm input-comment__btn-send"><span class="text-primary">Отправить</span></button>
                                        </div>
                                        <div class="input-comment__tools">
                                            <div class="input-comment__remove">
                                                <img src="img/icon-cross.png" alt="">
                                            </div>
                                        </div>
                                    </div>`);

            blockComment.find('.input-comment textarea').focus();
        }
    });

    // Удаление блока ввода ответа на комментария
    $(document).on('click', '.input-comment__remove', function () {
        $(this).closest('.input-comment-answer').remove();
    });

    //
    $('.input-comment_main').on('focus', 'textarea', function () {
        $(this).closest('.input-comment_main').parent().find('.comment-list').find('.input-comment-answer').remove();
    });

    //
    Date.prototype.getMonthName = function() {
        let month = ['января','февраля','марта','апреля','мая','июня',
            'июля','августа','сентября','октября','ноября','декабря'];
        return month[this.getMonth()];
    }

    // Получение значения даты в виде строки
    function makeStringDate(objDate) {
        let valDay = objDate.getDate() < 10 ? "0" + objDate.getDate() : objDate.getDate();
        let valMonth = objDate.getMonthName();
        let valYear = objDate.getFullYear();

        return `${valDay} ${valMonth} ${valYear}`;
    }

    // Получение значения времени в виде строки
    function makeStringTime(objDate) {
        let valHours = objDate.getHours() < 10 ? "0" + objDate.getHours() : objDate.getHours();
        let valMinutes = objDate.getMinutes() < 10 ? "0" + objDate.getMinutes() : objDate.getMinutes();

        return `${valHours}:${valMinutes}`;
    }

    // Добавление комментария 1-ого уровня
    $('.input-comment_main').on('click', '.input-comment__btn-send', function () {
        let textInputElement =  $(this).closest('.input-comment_main').find('textarea');
        let text = textInputElement.val();

        if (text.trim() != '') {
            let commentDateVal = makeStringDate(new Date);
            let commentTimeVal = makeStringTime(new Date);

            $(this).closest('.input-comment_main').parent().find('.comment-list').prepend(`<li>
                                        <div class="comment">
                                            <div class="comment__header">
                                                <div class="comment__header-info">
                                                    <img src="img/icon-user-circle.png" alt="">
                                                    <div class="comment__header-info-caption">
                                                        <b>Семен Петров</b>
                                                    </div>
                                                </div>
                                                <div class="comment__header-date pull-right">
                                                    <div>${commentDateVal}</div>
                                                    <div>в ${commentTimeVal}</div>
                                                </div>
                                            </div>
                                            <div class="comment__body">
                                                <p>${text}</p>
                                                <span class="comment__link-answer">Ответить</span>
                                            </div>
                                        </div>
                                        <ul></ul>
                                    </li>`);

            textInputElement.val('');
        }
    });

    // Добавление ответа на комментарий
    $(document).on('click', '.input-comment-answer .input-comment__btn-send', function () {
        let textInputElement = $(this).closest('.input-comment-answer').find('textarea');
        let text = textInputElement.val();

        if (text.trim() != '') {
            let commentDateVal = makeStringDate(new Date);
            let commentTimeVal = makeStringTime(new Date);

            $(this).closest('.comment').next('ul').prepend(`<li>
                                        <div class="comment">
                                            <div class="comment__header">
                                                <div class="comment__header-info">
                                                    <img src="img/icon-user-circle.png" alt="">
                                                    <div class="comment__header-info-caption">
                                                        <b>Семен Петров</b>
                                                    </div>
                                                </div>
                                                <div class="comment__header-date pull-right">
                                                    <div>${commentDateVal}</div>
                                                    <div>в ${commentTimeVal}</div>
                                                </div>
                                            </div>
                                            <div class="comment__body">
                                                <p>${text}</p>
                                                <span class="comment__link-answer">Ответить</span>
                                            </div>
                                        </div>
                                        <ul></ul>
                                    </li>`);

            $(this).closest('.input-comment-answer').remove();
        }
    });

    // Загрузка файлов drop-area
    if ($('#drop-area').length) {

        let body = $('body');
        let dropArea = $('#drop-area');
        let sourceFilesList = $('#sourceFilesList');
        let maxFilesCount = 10;
        let maxFileSize = 5*(1024**2);
        let maxAllFilesSize = 110*(1024**2);
        let allFilesSize = 0;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
            dropArea[0].addEventListener(eventName, preventDefaults, false);
            body[0].addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(function (eventName) {
            dropArea[0].addEventListener(eventName, highlight, false);
            dropArea[0].addEventListener(eventName, active, false);
        });

        ['dragleave', 'drop'].forEach(function (eventName) {
            dropArea[0].addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropArea.addClass('highlight');
        }

        function unhighlight(e) {
            dropArea.removeClass('highlight');
        }

        function active(e) {
            dropArea.addClass('active');
        }

        function unactive(e) {
            dropArea.removeClass('active');
        }

        dropArea[0].addEventListener('drop', handleDrop, false);
        dropArea[0].addEventListener('drop', unactive, false);

        let filesList = {};
        let fileId = 0;

        function handleDrop(e) {
            let dt = e.dataTransfer;
            let files = dt.files;

            handleFiles(files);
        }

        $('#inputFile').on('change', function () {
            let files = $(this)[0].files;

            handleFiles(files);
        });

        function handleFiles(files) {
            $('#alertSuccess').remove();

            for (let i = 0; i < files.length; i++) {

                if (files[i].type){

                    if (Object.keys(filesList).length < maxFilesCount && (allFilesSize + files[i].size) <= maxAllFilesSize) {

                        if ( $('#sourceFilesListWrap:hidden') ) {
                            $('#sourceFilesListWrap').show();
                        }

                        filesList[fileId] = files[i];

                        allFilesSize += files[i].size;

                        previewFile(files[i], fileId);

                        fileId += 1;

                    }
                }
            }

            fileValidation(filesList);

            sourceFilesList[0].scrollTop = sourceFilesList[0].scrollHeight;
        }

        // вывод файла в область списка файлов для загрузки
        function previewFile(file, fileId) {
            let fileName = file.name;
            let fileSize = file.size;
            let fileLink = window.URL.createObjectURL(file);

            let fileItem = $('<li>', {
                class: 'text-muted',
                'data-file-id': fileId
            });

            let tools = $('<div>', {
                class: 'tools',
                append: $(`<span class="action-remove">
            <span class="glyphicon glyphicon-trash text-muted"></span>
          </span>`)
            });

            fileItem.append(`<a href="${fileLink}" target="_blank">${fileName}</a>`).append(tools);

            if (fileSize>=1048576) {
                let fileSizeTitle = (fileSize/1048576).toFixed(2) + 'mb';

                if (fileSize > maxFileSize) {
                    tools.prepend(`<small class="text-danger m-r-10">${fileSizeTitle}</small>`).after(`<div class="text-danger">
            <small>Превышен размер ${maxFileSize/1048576}mb</small>
          </div>`);
                } else {
                    tools.prepend(`<small class="text-muted m-r-10">${fileSizeTitle}</small>`);
                }
            } else {
                let fileSizeTitle = (fileSize/1024).toFixed(2) + 'kb';

                tools.prepend(`<small class="text-muted m-r-10">${fileSizeTitle}</small>`)
            }

            fileItem.appendTo(sourceFilesList);
        }

        // удаление файла
        sourceFilesList.on('click', '.action-remove', function () {
            let fileId = $(this).closest('li').attr('data-file-id');
            let filesCount = Object.keys(filesList).length;

            allFilesSize -= filesList[fileId].size;
            delete filesList[fileId];

            $(this).closest('li').remove();

            if (Object.keys(filesList).length < 1) {
                $('#sourceFilesListWrap').hide();
            }

            if ( !isWrongFileSize(filesList) ) {
                $('#alertWrongFileSize').remove();
            }
        });

        // проверка размера каждого файла
        function isWrongFileSize(filesList) {
            for (let key in filesList) {
                if (filesList[key].size > maxFileSize) {
                    return true;
                }
            }
            return false;
        }

        function fileValidation(filesList) {
            if ( isWrongFileSize(filesList) && !$('#alertWrongFileSize').length ) {
                $('#sourceFilesListWrap').append(`<div id="alertWrongFileSize" class="text-danger fs-12">Удалите файлы, превышающие максимальный размер ${maxFileSize/(1024**2)} Mb</div>`);
            }
        }
    }

    // nav fixed to top by scrolling
    $('.sticky-wrapper').height(function () {
        return $(this).height();
    });

    if ($('.sticky-wrapper').length) {
        $(window).scroll(function () {
            if ($(this).scrollTop() > $('.sticky-wrapper').offset().top) {
                $('.sticky-wrapper').addClass('sticky-wrapper_is-sticky');
            }
            else {
                $('.sticky-wrapper').removeClass('sticky-wrapper_is-sticky');
            }
        });
    }

    $('.sticky-wrapper__nav-item').on('click', function () {
        let offset = $(this).closest('.sticky-wrapper').height();
        let itemId = $(this).find('a').attr('href');

        $('html, body').animate({scrollTop: $(itemId).offset().top - offset - 20},
            {
                duration: 800,
                easing: "swing"
            });

        return false;
    });

    // button scroll to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('#scrollup').fadeIn();
        }
        else {
            $('#scrollup').fadeOut();
        }
    });

    $('#scrollup').on('click', function () {
        $('html, body').animate({scrollTop: 0});
        return false;
    });

    // карта на странице создания жалобы
    if ($('#mapYandex').length) {
        ymaps.ready(init);

        function init() {
            let myMap = new ymaps.Map("mapYandex", {
                center: [55.752288, 37.655373],
                zoom: 16,
                scroll: false,
                controls: ['zoomControl', 'fullscreenControl']
            });

            let myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [55.752288, 37.655373]
                }
            });
            myMap.geoObjects.add(myGeoObject);
        }
    }

    // карта на странице органов
    if ($('#mapYandexOrganizations').length) {

        let mapCenter = [56.010563, 92.852572];
        let objectsCoords = [
            [56.011545, 92.851857],
            [56.064466, 92.942481],
            [55.983943, 92.905181],
            [56.016930, 92.849680],
            [56.012413, 92.781163],
            [56.016197, 92.860001]
        ];

        ymaps.ready(initMapOrganization);

        function initMapOrganization() {


            let myMap = new ymaps.Map("mapYandexOrganizations", {
                center: mapCenter,
                zoom: 11,
                scroll: false,
                controls: ['zoomControl', 'fullscreenControl']
            });

            let myGeoObjects = [];

            for ( let i = 0; i < objectsCoords.length; i++ ) {
                myGeoObjects[i] = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: objectsCoords[i]
                    },
                    properties: {
                        balloonContentHeader: "Наименование организации",
                        balloonContentBody: "Адрес организации",
                        balloonContentFooter: "Другая инфа",
                        hintContent: "Хинт метки"
                    }
                });
            }

            let myClusterer = new ymaps.Clusterer();

            myClusterer.add(myGeoObjects);
            myMap.geoObjects.add(myClusterer);
        }
    }

    //
    $('#modalHelper').on('hide.bs.modal', function () {
        let video = $('#modalVideo');
        video.attr("src", video.attr("src"));
    });

    let modalVideoFlag = false;

    $('#modalHelper').on('show.bs.modal', function () {
        if (!modalVideoFlag) {
            let video = $('#modalVideo');
            video.attr("src", video.attr("src"));

            modalVideoFlag = true;
        }
    });

    // Чат. Ответ на сообщение
    let chatSendingBLock = $('#chatSendingBLock');

    function toPrepareChatAnswer (msgId, msgTitle, msgText) {
        chatSendingBLock.find('.sending-block__answer').addClass('sending-block__answer_show');

        chatSendingBLock.find('.sending-block__answer-body').attr('data-msg-id', msgId);

        chatSendingBLock.find('.sending-block__answer-title').text(msgTitle);
        chatSendingBLock.find('.sending-block__answer-text').text(msgText);

        chatSendingBLock.find('.sending-block__textarea').focus();
    }

    $(document).on('dblclick', '.od-chat__msg', function () {
        let messageId = $(this).attr('id');
        let title = $(this).find('.od-chat__msg-title').text();
        let text = $(this).find('.od-chat__msg-text').text();

        toPrepareChatAnswer (messageId, title, text);
    });

    $(document).on('click', '.od-chat__msg-answer', function () {
        let messageId = $(this).closest('.od-chat__msg').attr('id');
        let title = $(this).closest('.od-chat__msg').find('.od-chat__msg-title').text();
        let text = $(this).closest('.od-chat__msg').find('.od-chat__msg-text').text();

        toPrepareChatAnswer (messageId, title, text);
    });

    $(document).on('click', '.sending-block__answer-close', function () {
        $(this).closest('.sending-block__answer').removeClass('sending-block__answer_show');
        chatSendingBLock.find('.sending-block__answer-title').text('');
        chatSendingBLock.find('.sending-block__answer-text').text('');
    });

    // Прокрутка к сообщению и подсветка
    $(document).on('click', '.sending-block__answer-body, .od-chat__pre-msg', function (e) {
        let msgId = $(this).attr('data-msg-id');
        let msgItem = $(`#${msgId}`);
        let msgTopPosition = msgItem[0].offsetTop;

        $('#chatViewBlock').animate({scrollTop: msgTopPosition - 50});

        msgItem.closest('.od-chat__msg-wrap').addClass('od-chat__msg-wrap_highlighted');

        setTimeout(function () {
            msgItem.closest('.od-chat__msg-wrap').removeClass('od-chat__msg-wrap_highlighted');
        }, 3000);
    });

    // Чат. Показать настройки чата.
    $(document).on('click', '.od-chat__view-show-settings', function () {
        let blockSettings = $(this).closest('.od-chat__view').find('.od-chat__view-settings');

        blockSettings.toggleClass('od-chat__view-settings_show');
    });

    $(document).on('click', '.od-chat__view-settings-close', function () {
        $(this).closest('.od-chat__view-settings').removeClass('od-chat__view-settings_show');
    });
});
