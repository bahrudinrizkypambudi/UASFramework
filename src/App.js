import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'BookingList Application',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.name.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;
    let nohp = this.refs.nohp.value;

    if(this.state.act === 0){   //new
      let data = {
        name, address, nohp
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;
    this.refs.nohp.value = data.nohp;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.name.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Masukan Nama Anda" className="formField" />
          <input type="text" ref="address" placeholder="Masukan Kota Asal Anda" className="formField" />
          <input type="text" ref="nohp" placeholder="Masukan No Hp Anda" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.address}, {data.nohp}
              <button onClick={()=>this.fRemove(i)} className="myListButton">Hapus </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">update </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
