;
(function ($) {
    'use strict';

    $.fn.simpleModal = function () {
        function modal(url) {
            var modalSelector = '#main-modal';
            var $modalContainer = $(modalSelector);

            $.ajax({
                url: url,
                beforeSend: function () {
                    $modalContainer
                        .find('#modal-loading')
                        .removeClass('hidden')
                        .find('#modal-content')
                        .addClass('hidden');

                    $modalContainer.on('hide.bs.modal', function () {
                        $modalContainer
                            .find('#modal-error')
                            .addClass('hidden')
                            .find('#modal-content')
                            .addClass('hidden');
                    });

                    $modalContainer.modal();
                }
            }).done(function (response) {
                $modalContainer
                    .find('#modal-content')
                    .html(response)
                    .find('#modal-content')
                    .removeClass('hidden');
            }).always(function () {
                $modalContainer
                    .find('#modal-loading')
                    .addClass('hidden');
            }).fail(function () {
                $modalContainer
                    .find('#modal-error')
                    .removeClass('hidden');
            });
        }

        return this.each(function (index, element) {
            var $element = $(element);

            $element.on('click', function (e) {
                e.preventDefault();
                modal($element.data('main-modal'));
            });
        });
    };
}(jQuery));