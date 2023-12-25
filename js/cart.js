function addToCart(item) {
    // debugger;
    item.quantity = 1;
    console.log(item.quantity);
    var list;
    if (localStorage.getItem('cart') == null) {
        list = [item];
    } else {
        list = JSON.parse(localStorage.getItem('cart')) || [];
        let ok = true;
        for (let x of list) {
            if (x.id == item.id) {
                x.quantity += 1;
                ok = false;
                break;
            }
        }
        if (ok) {
            list.push(item);
        }
    }
    localStorage.setItem('cart', JSON.stringify(list));
    alert("Đã thêm giỏ hàng thành công!");
}
var list = JSON.parse(localStorage.getItem('cart'));
function LoadData() {
    var str = "";
    var t = 0;
    for (let x of list) {
        t += x.price * x.quantity;
        str += `<tr>
                        <td><i onclick="Xoa(`+ x.id + `)" class="fa-solid fa-circle-xmark" style="font-size:30px;color:red;cursor: pointer;" title="Xóa"></i></td>
                        <td><img style="width: 50px; height: 50px; object-fit: cover;" src="`+ x.image + `"> </td>
                        <td>`+ x.name + `</td>
                        <td>`+ x.price + `đ</td>
                        <td> 
                            <button onclick="Giam(`+ x.id + `)" style="border: 1px solid #dbdbdb;padding: 4px 8px;">-</button>
                            <input id="q_`+ Number(x.id) + `" onchange="updateQuantity(` + x.id + `)" type="text" value="` + x.quantity + `" style="width: 35px;border: 1px solid #dbdbdb;padding: 4px;margin-left: -5px;margin-right: -5px;">
                            <button onclick="Tang(`+ x.id + `)" style="border: 1px solid #dbdbdb;padding: 4px 8px;">+</button>
                        </td>
                        <td>`+ (x.price * x.quantity) + `đ</td>
                    </tr>
                 `;
    }
    document.getElementById("listCart").innerHTML = str;
    $("#spTong").text(t);
    $("#tTong").text(t);
}
function XoaCart() {
    if (confirm("Bạn muốn xóa tất cả sản phẩm khỏi giỏ hàng!")) {
        localStorage.setItem('cart', null);
        location.reload();
    }
}
function Xoa(id) {
    if (confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng!")) {
        var index = list.findIndex(x => x.id == id);
        if (index >= 0) {
            list.splice(index, 1);
        }
        LoadData();
    }
}
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(list));
    alert("Đã cập nhật thông tin giỏ hàng thành công!");
}
function Tang(id) {
    var index = list.findIndex(x => x.id == id);
    if (index >= 0) {
        list[index].quantity += 1;
    }
    LoadData();
}
function Giam(id) {
    var index = list.findIndex(x => x.id == id);
    if (index >= 0 && list[index].quantity >= 1) {
        list[index].quantity -= 1;
    }
    LoadData();
}
function updateQuantity(id) {
    var quantity = Number($('#q_' + id).val());
    var index = list.findIndex(x => x.id == id);
    if (index >= 0 && list[index].quantity >= 1) {
        list[index].quantity = quantity;
    }
    LoadData();
}
function DatHang() {
    list_order = JSON.parse(localStorage.getItem('order')) || [];
    var u = JSON.parse(localStorage.getItem('userKH')) || [];
    var d = new Date();
    madon = Number(d);
    var tien = 0;
    var soluong = 0;
    for (let l of list) {
        tien += l.price * l.quantity;
        soluong += l.quantity;
    }
    var order = {
        "madon": madon,
        "makh": u.makh,
        "tenkh_ten": u.tenkh_ten,
        "sdtkh": u.sdtkh,
        "emailkh": u.emailkh,
        "diachikh": u.diachikh,
        "soluongsp":soluong,
        "tongtien": tien,
        "trangthai": "Chưa gửi"
    };
    list_order.push(order);
    localStorage.setItem('order', JSON.stringify(list_order));
    localStorage.setItem('cart', null);
    alert("Đặt hàng thành công");
    location.reload();
}
LoadData();