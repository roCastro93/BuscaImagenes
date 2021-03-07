import React from 'react'
import './Imagen.css';

const Imagen = ({ imagen }) => {

    const { largeImageURL, likes, previewURL, tags, views } = imagen;

    //console.log(imagen);
    return (
        <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4">
            <div className="card">
                <img src={previewURL} alt={tags} className="zoom card-img-top img-fluid" />
                <div className="card-body">
                    <p className="card-text">{likes} Me gusta</p>
                    <p className="card-text">{views} Vistas</p>
                </div>
                <div className="card-footer">
                    <a href={largeImageURL} rel="noopener noreferrer" target="_black" className="btn btn-primary btn-block">Ver Imagen</a>
                </div>
            </div>
        </div>
    )
}
export default Imagen;