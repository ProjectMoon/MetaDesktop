function House(name,rooms,price,garage) {
this.name=name;
this.rooms=rooms;
this.price=price;
this.garage=garage;
this.view=view;
}
function view() {
with (this) document.write(name+' has '+rooms+' rooms, '+(garage?'a':'no')+' garage, and costs £'+price+'<BR>');
}
house1=new House('House 1',4,100000,false);
house2=new House('Big House',5,200000,true);
house1.view();
house2.view();
