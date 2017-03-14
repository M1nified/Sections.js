class Sections {
    sections: any[];
    all: any[] = [];
    constructor(sections: any[], options?) {
        this.sections = sections;
        this.updateSections();
    }
    updateSections() {
        this.sections.forEach((section) => {
            let header = this.getFirstHeader(section);
            let head = document.createElement('div');
            head.classList.add('sections-head');
            head.appendChild(header);
            let content = document.createElement('div');
            content.classList.add('sections-content');
            let children = section.childNodes;
            for (let i = children.length - 1; i >= 0; i--) {
                content.insertBefore(children[i], content.firstChild);
            }
            section.appendChild(head);
            section.appendChild(content);
            content.style.maxHeight = content.clientHeight + 'px';
            content.classList.add('sections-hidden');

            this.all.push({
                head,
                content
            });

            let onclick = (evt) => {
                this.all.forEach((sec) => {
                    if (sec.content == content) return;
                    sec.content.classList.add('sections-hidden');
                })
                content.classList.toggle('sections-hidden');
            }
            head.addEventListener('click', onclick);
        });
    }
    getFirstHeader(elem: HTMLElement): HTMLElement {
        let h;
        let num = 1;
        while (!h && num < 7) {
            h = elem.querySelector("h" + num++);
        }
        return h;
    }
}