export class fileInfo {
    id: number;
    file: FormData;
    type: string;

    add(imageBulb, num, type){
        this.file = new FormData();
        
        var splitted = type.split("/", 1);
        this.file.set(splitted[0], imageBulb);
        this.type = splitted[0];
        console.log("In the fileInfo setter");
        this.id = num;
        console.log(this.id)
    }
}