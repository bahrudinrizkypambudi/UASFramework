import React, {Component} from "react";
import firebase from "firebase";
import firebaseConfig from "./config";

class masukan extends Component{
    constructor(props){
        super(props);
        firebase.initializeApp(firebaseConfig);

        this.state = {
            listMasukan: []
        }
    }

    ambilDataDariServerAPI = () => {                // fungsi untuk mengambil data dari API dengan penambahan sort dan order
        let ref = firebase.database().ref("/");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            console.log(state);   
        })
    }

    simpanDataKeServerAPI = () => {
        firebase.database().ref("/").set(this.state);
    }

    componentDidMount() {       // komponen untuk mengecek ketika compnent telah di-mount-ing, maka panggil API
        this.ambilDataDariServerAPI()  // ambil data dari server API lokal
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState !== this.state){
            this.simpanDataKeServerAPI();
        }
    }

    handleTombolSimpan = (event) => {            // fungsi untuk meng-handle tombol simpan
        let name = this.refs.name.value;
        let address = this.refs.address.value;
        let nohp = this.refs.nohp.value;
        let uid = this.refs.uid.value;

        if (uid && name && address && nohp){                  // Cek apakah semuad data memiliki nilai (tidak null)
            const {listMasukan} = this.state;
            const indeksMasukan = listMasukan.findIndex(data => {
                return data.uid === uid;
            })
            listMasukan[indeksMasukan].name = name;
            listMasukan[indeksMasukan].address = address;
            listMasukan[indeksMasukan].nohp = nohp;
            this.setState({listMasukan});
        } else if (name && address && nohp){                  // Cek jika apakah tidak ada data di server
            const uid = new Date().getTime().toString();
            const {listMasukan} = this.state;
            listMasukan.push({ uid, name, address , nohp });
            this.setState({listMasukan});
        }

        this.refs.name.value = "";
        this.refs.address.value = "";
        this.refs.nohp.value = "";
        this.refs.uid.value = "";
    }

    render() {
        return(
            <div className="post-artikel">
                <div className="form pb-2 border-bottom">
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Nama Booking</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="name" name="name" ref="name" 
                            onChange={this.handleTambahMasukan}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="addres" className="col-sm-2 col-form-label">Alamat</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="address" name="address" ref="address" 
                            onChange={this.handleTambahMasukan}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="nohp" className="col-sm-2 col-form-label">nohp</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="nohp" name="nohp"  ref="nohp" 
                            onChange={this.handleTambahMasukan}/>
                        </div>
                    </div>
                    <input type="hidden" name="uid" ref="uid"/>
                    <button type="submit" className="btn btn-primary" onClick={this.handleTombolSimpan}>submit</button>
                </div>
            </div>
        )
    }
}
export default masukan;