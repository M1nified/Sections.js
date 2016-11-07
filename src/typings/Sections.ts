class Sections{
    sections:any[];
    all:any[] = [];
    constructor(sections:any[],options?){
        this.sections = sections;
        this.updateSections();
    }
    updateSections(){
        this.sections.forEach((section)=>{
            let header = this.getFirstHeader(section);
            let head = document.createElement('div');
            head.classList.add('sections-head');
            section.insertBefore(head,section.firstChild);
            head.appendChild(header);
            let content = document.createElement('div');
            content.classList.add('sections-content');
            section.childNodes.forEach((val)=>{
                if(val == head) return;
                content.appendChild(val);
            });
            section.appendChild(content);
            content.style.maxHeight = content.clientHeight + 'px';
            content.classList.add('hidden');
            
            this.all.push({
                head,
                content
            });

            let onclick = (evt) => {
                this.all.forEach((sec)=>{
                    if(sec.content == content) return;
                    sec.content.classList.add('hidden');
                })
                content.classList.toggle('hidden');
            }
            head.addEventListener('click',onclick);
        });
    }
    getFirstHeader(elem:HTMLElement):HTMLElement{
        let h;
        let num = 1;
        while(!h && num<7){
            h = elem.querySelector("h"+num++);
        }
        return h;
    }
}