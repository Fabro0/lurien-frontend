import React, { useState, useContext, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';
import swal from 'sweetalert';
import UploadLogo from '../images/upload-logo.svg'
import '../styles/upload.css'
const Upload = props => {
    const [picture, setPicture] = useState(null);
    const { user } = useContext(AuthContext);
    const [style, setStyle] = useState({ width: '0%' })
    const [porcentaje, setPorcentaje] = useState({ porcentaje: '0%' })
    const [fotos, setFotos] = useState({ cantidad: 0 })
    const [toggle, setToggle] = useState(false);
    const [urls, setUrls] = useState(null)
    const authContext = useContext(AuthContext);

    const { dark, open2, setOpenn } = useContext(AuthContext);
    useEffect(() => {
        const owo = () => {
            if (dark) {

                document.body.classList.remove('dark-bg')
                document.body.classList.add('light-bg')
            }
            else {

                document.body.classList.remove('light-bg')
                document.body.classList.add('dark-bg')
            }
            setToggle(dark)
        }
        owo()
    }, [dark])

    const onChangeHandler = (e) => {

        let fotos = e.target.files;
        let cantidad = fotos.length
        if (cantidad > 0 && cantidad < 4) {
            setStyle({ width: '0%' })
            setPicture(fotos)
            let urls_1 = [];
            for (var i = 0; i < fotos.length; i++) {
                urls_1.push({ url: URL.createObjectURL(fotos[i]), index: i })
            }
            setUrls(urls_1)
            console.log("culo", urls_1)
            // console.log(e.target.files)
            setFotos({ cantidad })

        } else {
            alert("maximo 3 fotos perri")
        }
    }


    const onClickHandler = () => {
        if (fotos.cantidad > 0) {
            AuthService.getFotos(user.dni).then(res => {
                if (res <= 20 || res.data.cantidad + fotos.cantidad <= 20) {
                    const data = new FormData()
                    data.append('username', user.dni)
                    data.append('companyID', user.companyID)
                    for (var x = 0; x < picture.length; x++) {
                        let extensiones = ['.jpg', '.jpeg', '.png'];
                        for (let i = 0; i < extensiones.length; i++) {
                            if (picture[x].name.includes(extensiones[i])) {
                                data.append('file', picture[x])
                            }
                        }
                        setStyle({ width: ((x + 1) / picture.length) * 100 + '%' })
                        setPorcentaje({ porcentaje: ((x + 1) / picture.length) * 100 + '%' })
                    }
                    AuthService.upload(data, user.username, user.companyID, user.dni).then(res => {
                        swal(res.data.message)
                    })



                } else {
                    swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: "Estas intentando subir mas fotos de las que puedes, llevas: " + res.data.cantidad + " y quisiste subir " + fotos.cantidad + ", el maximo es 20",
                        footer: 'Volve a intentar'
                    })

                }
            })
        } else {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Intentaste entregar vacio pa',
                footer: 'Volve a intentar'
            })
        }
    }
    return (
        <div className="contenedor-general" onClick={() => {
            if (open2) {
                setOpenn(false)
                console.log("deja de tocarme")

            }
        }}>
            <div className="">
                <div className="contenedor">
                    <img src={UploadLogo} alt="" className="logo-upload" />
                    <p className="drag-n-drop">Drag &amp; Drop</p>
                    <p className="or-text">Or</p>
                        <label for="customFile" class="custom-file-upload">
                             Browse Files
</label>
                        <input  type="file" multiple onChange={onChangeHandler}  id="customFile" accept="image/png, image/jpeg,image/jpg"/>

                        <div className="progress">
                            <div className="progress-bar" role="progressbar" style={style} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">{porcentaje.porcentaje}</div>
                        </div>
                        <div className="img-zone">
                            {urls ? (
                                urls.map((url0) => {
                                    return <div className="cover-img"><img id={url0.index} className="image-preview" key={url0.index} src={url0.url} /></div>
                                })
                            ) : (null)}
                        </div>
                        <div className="vacio"></div>
                </div>
                <button type="button" className="boton-aceptar" onClick={onClickHandler}>Upload</button>

            </div>
        </div>
    )
}

export default Upload;