import PropTypes from 'prop-types';
import './style/main_body.scss';

const MainBody = ({children, SideBar, title}) => {
    return (
      <main className="main__body_double_col_wrapper" role="main">
        <div className="main__body">
          <div className="main__inner_center">
            <h2>{title}</h2>
            {children}
          </div>
          <div  className="main__sidebar_right">
            {SideBar}
          </div>
        </div>
      </main>
    )
  }
export default MainBody

MainBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element), 
    PropTypes.element.isRequired
  ]),
  SideBar: PropTypes.element,
  title: PropTypes.string,
}

MainBody.defaultProps = {
  Sidebar: null,
  title: null
}
