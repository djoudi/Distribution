/*
 * This file is part of the Claroline Connect package.
 *
 * (c) Claroline Consortium <consortium@claroline.net>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

(function () {
    'use strict';
    
    function getPage(tab)
    {
        var page = 1;

        for (var i = 0; i < tab.length; i++) {
            if (tab[i] === 'page') {
                if (typeof(tab[i + 1]) !== 'undefined') {
                    page = tab[i + 1];
                }
                break;
            }
        }

        return page;
    }
    
    $('#show-other-answers-btn').on('click', function () {
        var modal = window.Claroline.Modal;
        var surveyId = $(this).data('survey-id');
        var questionId = $(this).data('question-id');
        var choiceId = $(this).data('choice-id');
        var max = $(this).data('other-max');
        
        modal.fromRoute(
            'claro_survey_results_show_other_answers',
            {'survey': surveyId, 'question': questionId, 'choice': choiceId, 'max': max},
            function (element) {
                element.on('click', 'a', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    var modalBody = $(this).parents('.modal');
                    var url = $(this).attr('href');
                    var urlTab = url.split('/');
                    var page = getPage(urlTab);
                    
                    $.ajax({
                        url: Routing.generate(
                            'claro_survey_results_show_other_answers',
                            {
                                'survey': surveyId,
                                'question': questionId,
                                'choice': choiceId,
                                'page': page,
                                'max': max
                            }
                        ),
                        type: 'GET',
                        success: function (result) {
                            modalBody.html(result);
                        }
                    });
                });
            }
        );
    });
})();