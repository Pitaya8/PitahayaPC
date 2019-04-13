$('#systematicNname').html('123');
let html='';
for(let i = 0; i < 3; i++) {
  html += `
  <div class="col-md-3 agile_team_grid">
          <div class="agile_team_grid_main">
            <img src="http://img.boqiicdn.com/Data/U/P/img91405b8f86335f8da.jpg" alt=" " class="img-responsive">
            <div class="p-mask">
              <ul class="top-links two">
                <li><a href="#"><i class="fa fa-cart-arrow-down"></i></a></li>
              </ul>
            </div>
          </div>
          <div class="agile_team_grid1">
            <h3>${i}</h3>
            <p style="text-align: left;color:gray">The cards retail at £1.99 each, so buy 3 and save .97p!Choose any
              3 cards - Six designs to choose fr..</p>
            <p>£5.00</p>
          </div>
        </div>
  `;
}
$('#systematicGoodList').html(html)