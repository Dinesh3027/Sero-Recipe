
import { Link } from 'react-router-dom';
import { AppConstants } from 'src/utils/AppConstants';
import '../../global.css';

export const Home = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className="d-block w-100 text-center mb-3">
              <p className="lead mb-0">Your own personal cookbook in the form of a recipe journal.</p>
              <p className="lead">Add your favourites and new ideas for breakfast, lunch and dinner with our <b>Recipe Book</b> with plenty of space to store.</p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-4'>
            <div className='card'>
              <div className='card-body'>
                <h3>Take a Note</h3>
                <p className="lead">Add your Recipe and save it for future reference.</p>
                <Link className='btn btn-outline-primary' to={AppConstants.ADD}>Add Recipe</Link>
              </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <div className='card'>
              <div className='card-body'>
                <h3>Find Recipe</h3>
                <p className="lead">Search your favorite saved Recipe.</p>
                <Link className='btn btn-outline-success' to={AppConstants.SEARCH}>Search Recipe</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
