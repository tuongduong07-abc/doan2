$(document).ready(function(){
    $(window).scroll(function(){
        if($(this).scrollTop()){
            $('header').addClass('sticky');
        }else{
            $('header').removeClass('sticky');
        }
    });
});
//đăng nhập,đăng xuất
function LoadUserKH() {
    var u = JSON.parse(localStorage.getItem('userKH')) || [];

    $('#tenkhachhang').html(u.tenkh_ten);
    $('#tenkh').html(u.tenkh_ten);
    $('#sdtkh').html(u.sdtkh);
    $('#emailkh').html(u.emailkh);
    //$('#mkkh').html(u.mkkh);
}
LoadUserKH();
var user = JSON.parse(localStorage.getItem('userKH'));
if (user != null) {
    document.getElementById('btn-login').style.display = "none";
}
else if (user == null) {
    document.getElementById('logged').style.display = "none";
}
function LogOut() {
    localStorage.setItem('userKH', null);
    window.location.href = "index.html";
}
//đếm lượt truy cập
var numaccess =Number(localStorage.getItem('sum-access') );
numaccess+=1;
window.localStorage.setItem('sum-access', numaccess);