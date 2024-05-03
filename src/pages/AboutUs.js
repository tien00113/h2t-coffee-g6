import React from 'react';


const AboutUs = () => {
  return (
    <section class='about'>
      <h2>Về Chúng Tôi</h2>
      <div class='about_content'>
        <img src="https://cdn.pixabay.com/photo/2018/01/31/09/57/coffee-3120750_1280.jpg" alt="Coffee" />
        <div class="about_text">
          <h3>Chào mừng bạn đến với cửa hàng chúng tôi !</h3>
          <p>
            Hãy cùng tôi thưởng thức một tách cà phê thơm ngon nhé!
            Cà phê không chỉ là một thức uống giúp chúng ta tỉnh táo,
            mà còn là một nghệ thuật, một phần của cuộc sống.
            Hãy cùng nhâm nhi và tận hưởng hương vị đặc biệt từ từng hạt cà phê.
            Chúc bạn có những giây phút thật sự thú vị và tràn đầy năng lượng!
            <br />
            Chúng tôi là một nhóm người yêu cà phê,
            chúng tôi tin rằng mỗi tách cà phê đều mang lại một trải nghiệm độc đáo.
            Hãy cùng chúng tôi khám phá thế giới cà phê!</p>
        </div>
      </div>

      <h3>Người sáng lập</h3>
      <div class="team-container">
        <div class="member">
            <img src="https://qpet.vn/wp-content/uploads/2023/04/anh-meme-cho-meo-hai-huoc-24.jpg" alt="Đoàn Huy Hoàng"/>
            <div class="member-name">Đoàn Huy Hoàng</div>
            <div class="member-role">Giám đốc kinh doanh</div>
        </div>
        <div class="member">
            <img src="https://th.bing.com/th/id/OIP.1T4lXqT2QtcT5lHtRUIrmgHaG4?rs=1&pid=ImgDetMain" alt="TNguyễn Hiền Tiến"/>
            <div class="member-name">Nguyễn Hiền Tiến</div>
            <div class="member-role">Giám đốc điều hành</div>
        </div>
        <div class="member">
            <img src="https://i.imgflip.com/442tpr.jpg" alt="Đào Huyền Trang"/>
            <div class="member-name">Đào Huyền Trang</div>
            <div class="member-role">Giám đốc Marketing</div>
        </div>
      </div>

    </section>
  )
}

export default AboutUs