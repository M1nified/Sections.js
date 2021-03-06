if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp*/) {
        var len = this.length;
        if (typeof fun != "function")
            throw new TypeError();
        var res = new Array();
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this))
                    res.push(val);
            }
        }
        return res;
    };
}
NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.filter = Array.prototype.filter;
var Sections = (function () {
    function Sections(sections, options) {
        this.all = [];
        this.sections = sections;
        this.updateSections();
    }
    Sections.prototype.updateSections = function () {
        var _this = this;
        this.sections.forEach(function (section) {
            var header = _this.getFirstHeader(section);
            var head = document.createElement('div');
            head.classList.add('sections-head');
            head.appendChild(header);
            var content = document.createElement('div');
            content.classList.add('sections-content');
            var children = section.childNodes;
            for (var i = children.length - 1; i >= 0; i--) {
                content.insertBefore(children[i], content.firstChild);
            }
            section.appendChild(head);
            section.appendChild(content);
            content.style.maxHeight = content.clientHeight + 'px';
            content.classList.add('sections-hidden');
            _this.all.push({
                head: head,
                content: content
            });
            var onclick = function (evt) {
                _this.all.forEach(function (sec) {
                    if (sec.content == content)
                        return;
                    sec.content.classList.add('sections-hidden');
                });
                content.classList.toggle('sections-hidden');
            };
            head.addEventListener('click', onclick);
        });
    };
    Sections.prototype.getFirstHeader = function (elem) {
        var h;
        var num = 1;
        while (!h && num < 7) {
            h = elem.querySelector("h" + num++);
        }
        return h;
    };
    return Sections;
}());
//# sourceMappingURL=index.js.map