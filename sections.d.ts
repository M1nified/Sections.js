declare class Sections {
    sections: any[];
    all: any[];
    constructor(sections: any[], options?: any);
    updateSections(): void;
    getFirstHeader(elem: HTMLElement): HTMLElement;
}
