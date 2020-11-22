export class fileInfo {
    id: number;
    file: FormData;
    type: string;

    add(imageBulb, num, type){
        this.file = new FormData();
        
        var splitted = type.split("/", 1);

        if (splitted[0] == "image"){
            this.file.set('image', imageBulb);
            //console.log(splitted[0])
        }
        else
            return false;

        this.type = splitted[0];
        console.log("In the fileInfo setter");
        this.file.forEach(function(val){
            console.log(val);
        });
        this.id = num;
        console.log(this.id)
    }
}