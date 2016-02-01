/*
 * Copyright (c) 2015 LINE Corporation. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * LINE Corporation. ("Confidential Information"). You shall not disclose such
 * Confidential Information and shall use it only in accordance with the terms
 * of the license agreement you entered into with LINE Corporation.
 */
$.fn.extend({
    render: function(source, data) {
        var template = Handlebars.compile(source);
        var html = $(template(data)).html();
        $(this).append(html);
    }
});

var data = {
    users1: [{
        username: "alan",
        firstName: "Alan",
        lastName: "Johnson",
        email: "alan@test.com"
    }, {
        username: "allison",
        firstName: "Allison",
        lastName: "House",
        email: "allison@test.com"
    }, {
        username: "ryan",
        firstName: "Ryan",
        lastName: "Carson",
        email: "ryan@test.com"
    }]
};

$('body').render(templates["src/partials/templates/emmet.hbs"], data);
