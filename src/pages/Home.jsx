import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import AWS from 'aws-sdk';


const Home = () => {

  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can perform any logic with the collected credentials
    console.log('Access Key ID:', accessKeyId);
    console.log('Secret Access Key:', secretAccessKey);
    const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
    var instanceParams = {
      ImageId: 'ami-04e35eeae7a7c5883',
      InstanceType: 't2.micro',
      MinCount: 1,
      MaxCount: 1
    };

    // Create a promise on an EC2 service object
    var instancePromise = new AWS.EC2({
      apiVersion: '2016-11-15',
      region: 'us-west-2',
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey
      }
    }).runInstances(instanceParams).promise();

    // Handle promise's fulfilled/rejected states
    instancePromise.then(
      function (data) {
        console.log(data);
        var instanceId = data.Instances[0].InstanceId;
        console.log("Created instance", instanceId);
      }).catch(
        function (err) {
          console.error(err, err.stack);
        });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl text-white">Good morning! SpinUp user</h1>
      </div>
      <div>
        <h1 className="text-2xl text-white my-10">Nodes You want to spin up</h1>
      </div>
      <div className="bg-secondary-100 p-8 rounded-xl">
        <div className="hidden md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-10 p-4">
          <h5>Column 1</h5>
          <h5>Column 2</h5>
          <h5>Column 3</h5>
          <h5>Column 4</h5>
          <h5>Column 5</h5>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-4 bg-secondary-900 p-4 rounded-xl">
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">ID</h5>
            <span>#1 </span>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Descripción</h5>
            <p> Base Node</p>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Estatus</h5>
            <span className="py-1 px-2 bg-yellow-500/10 text-red-500 rounded-lg">
              AWS
            </span>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Fecha</h5>
            <span>Today</span>
          </div>
          <div>
            <h5 className="md:hidden text-white font-bold mb-2">Acciones</h5>
            <Menu
              menuButton={
                <MenuButton className="flex items-center gap-x-2 bg-secondary-100 p-2 rounded-lg transition-colors">
                  Spin it up
                </MenuButton>
              }
              align="end"
              arrow
              arrowClassName="bg-secondary-100"
              transition
              menuClassName="bg-secondary-100 p-4"
            >
              <MenuItem className="p-0 hover:bg-transparent">
                <Link
                  to="/perfil"
                  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                >
                  AWS
                </Link>
              </MenuItem>
              <MenuItem className="p-0 hover:bg-transparent">
                <Link
                  to="/perfil"
                  className="rounded-lg transition-colors text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 p-2 flex-1"
                >
                  Azure
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <div className="justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-white">AWS Credentials</h2>
          <div className="mb-4">
            <label className="block font-medium mb-2 text-white" htmlFor="accessKeyId">Access Key ID</label>
            <input
              type="text"
              id="accessKeyId"
              className="w-full border rounded-md p-2 bg-gray-700 text-white"
              value={accessKeyId}
              onChange={(e) => setAccessKeyId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2 text-white" htmlFor="secretAccessKey">Secret Access Key</label>
            <input
              type="password"
              id="secretAccessKey"
              className="w-full border rounded-md p-2 bg-gray-700 text-white"
              value={secretAccessKey}
              onChange={(e) => setSecretAccessKey(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-primary py-2 px-4 rounded-md hover:bg-secondary-900 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4 text-white">Azure Credentials</h2>
          <div className="mb-4">
            <label className="block font-medium mb-2 text-white" htmlFor="accessKeyId">Access Key ID</label>
            <input
              type="text"
              id="accessKeyId"
              className="w-full border rounded-md p-2 bg-gray-700 text-white"
              value={accessKeyId}
              onChange={(e) => setAccessKeyId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2 text-white" htmlFor="secretAccessKey">Secret Access Key</label>
            <input
              type="password"
              id="secretAccessKey"
              className="w-full border rounded-md p-2 bg-gray-700 text-white"
              value={secretAccessKey}
              onChange={(e) => setSecretAccessKey(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-primary py-2 px-4 rounded-md hover:bg-secondary-900 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
