export function checkLanguage(): boolean {
    return window.localStorage.getItem("language") === "fr-FR";
}

export function usToFrenchDate(date: string): string {
    let arr: string[] = date !== undefined ? date.split("-") : [];
    
    return arr === [] ? " " : arr[2] + "-" + arr[1] + "-" + arr[0];
}