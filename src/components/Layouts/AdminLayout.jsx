import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Menu} from "antd"
import {Link, Redirect} from "react-router-dom"

function AdminLayout({component: Component}) {
  const userInfo = JSON.parse(localStorage.getItem("account"));
  if (userInfo && userInfo.role != "admin") {
    return <Redirect to="/" />;
  }
  const menu = () => {
    const items = [
      { label: (<Link to="/admin">Products</Link>), key: 'product' },
      { label: (<Link to="/">Client site</Link>), key: 'client' }
    ];
    return(<Menu items={items} />);
  }

  return (
    <div className="row">
      <ToastContainer />
      <div className="col-md-2">
        {menu()}
      </div>
      <div className="col-md-10">
        <div className="admin-main">
          <Component />
        </div>
      </div>
    </div>
  );
}
export default AdminLayout;
