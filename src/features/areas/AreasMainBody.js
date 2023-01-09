import PropTypes from 'prop-types';
import './Area.css';

const AreasMainBody = ({children, SideBar, title}) => {
    return (
      <main className="main__body_wrapper" role="main">
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
export default AreasMainBody

AreasMainBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element), 
    PropTypes.element.isRequired
  ]),
  SideBar: PropTypes.element,
  title: PropTypes.string,
}

AreasMainBody.defaultProps = {
  Sidebar: null,
  title: null
}
