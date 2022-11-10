import BannerImage1 from '../../img/banner/banner-1.jpg';
import BannerImage2 from '../../img/banner/banner-2.jpg';

import Category from '../../components/Home/Category';
import FeatureProduct from '../../components/Home/FeatureProduct';
import LatestProduct from '../../components/Home/LatestProduct';
import Blog from '../../components/Home/Blog';
import Menu from '../../components/Menu';


function Home(){
  return(
    <>
      <Menu />
      <Category />
      <FeatureProduct />
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src={BannerImage1} alt="" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src={BannerImage2} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LatestProduct />
      <Blog />
    </>
  );
}
export default Home;
