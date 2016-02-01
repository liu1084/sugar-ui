/*
 * The MIT License (MIT)
 * Copyright (c) @year Jim.liu
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

;(function (templates, undefined) {
  templates["src/partials/templates/emmet.hbs"] = "<script type=\"text/x-handlebars-template\" id=\"test1\">\n" +
    "    <table>\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th>Lorem.</th>\n" +
    "            <th>Debitis!</th>\n" +
    "            <th>Sint.</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        {{#users}}\n" +
    "            <tr>\n" +
    "                <td>{{username}}</td>\n" +
    "                <td>{{firstName}} {{lastName}}</td>\n" +
    "                <td>{{email}}</td>\n" +
    "            </tr>\n" +
    "        {{/users}}\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "</script>\n" +
    "";
})(this.templates = this.templates || {});