
// lấy ra các button status có thuộc tính tự định nghĩa nhớ phải để trong dấu ngoặc vuông

const buttonStatus = document.querySelectorAll("[button-status]");
// kiem tra cac button co ton tai
if (buttonStatus.length > 0) {
    // trong boottrap có sẵn thư viện URL hỗ trợ để sửa cái param trên url hi tra bấm vào nút
    let url = new URL(window.location.href);

    buttonStatus.forEach(button => {

        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            console.log(url.href);

            window.location.href = url.href;
        });
    });

}

// Form search 
const formSearch = document.querySelector("#form-search")
if (formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();// ngăn sự kiện load lại trang mặc định 
        let url = new URL(window.location.href);
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        }
        else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;

    })
}
