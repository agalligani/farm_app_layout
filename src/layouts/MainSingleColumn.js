import PropTypes from 'prop-types';
import './style/main_body.scss';

const MainBody = ({children, SideBar, title}) => {
    return (
      <main className="main__body_single_col_wrapper" role="main">
        <div className="main__body">
          <div className="main__inner_center">
            <h2>{title}</h2>
            {children}
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
  title: PropTypes.string,
}

MainBody.defaultProps = {
  title: null
}
