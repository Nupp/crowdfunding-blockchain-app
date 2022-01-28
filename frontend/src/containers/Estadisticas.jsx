import React, { useState } from "react";
import { Table, Button } from "reactstrap";
import swal from "sweetalert";
import { createContract } from './../ethereum/crowdfundingContract'
import { web3 } from './../ethereum/web3'
import { useParams } from 'react-router-dom'

const Estadistica = () => {
  let params = useParams()

  console.log(params)

  const ONGOING_STATE = "0";
  const FAILED_STATE = "1";
  const SUCCEEDED_STATE = "2";
  const PAID_OUT_STATE = "3";

  const [state, setState] = useState({
    campaign: {
      name: "N/A",
      targetAmount: 0,
      totalCollected: 0,
      campaignFinished: false,
      deadline: new Date(0),
      isBeneficiary: false,
      state: "",
    },
    contributionAmount: "0",
  });

  const HandleClick = () => {
    swal(" Contribute:", {
      content: "input",
    }).then((value) => {
      swal(`Contribute: ${value}`);

      setState({
        ...state,
        ["contributionAmount"]: value,
      });
    });
  };


  const componentDidMount = async () => {
    const currentCampaign = await getCampaign(getCampaignAddress())
    setState({
      ...state,
      campaign: currentCampaign
    })
  }

  const getCampaignAddress = () => {
    return params.address
  }

  const getCampaign = async (address) => {
    console.log("getCampaign: "+address)
    // const contract = createContract(address)

    // const name            = await contract.methods.name().call()
    // const targetAmount    = await contract.methods.targetAmount().call()
    // const totalCollected  = await contract.methods.totalCollected().call()
    // const beforeDeadline  = await contract.methods.beforeDeadline().call()
    // const beneficiary     = await contract.methods.beneficiary().call()
    // const deadlineSeconds = await contract.methods.fundingDeadline().call()
    // const state           = await contract.methods.state().call()

    // var deadlineDate = new Date(0);
    // deadlineDate.setUTCSeconds(deadlineSeconds)

    // const accounts = await web3.eth.getAccounts()

    // return {
    //   name: name,
    //   targetAmount: targetAmount,
    //   totalCollected: totalCollected,
    //   campaignFinished: !beforeDeadline,
    //   deadline: deadlineDate,
    //   isBeneficiary: beneficiary.toLowerCase() === accounts[0].toLowerCase(),
    //   state: state
    // }


    return {
      name: 'contract name',
      targetAmount: 100,
      totalCollected: 50,
      campaignFinished: false,
      deadline: new Date(),
      isBeneficiary: true,
      state: ONGOING_STATE
    }
  }

  const campaignInteractionSection = () => {
    if (state.campaign.campaignFinished) {
      return postCampaignInterface()
    } else {
      return contributeInterface()
    }
  }

  const postCampaignInterface = () => {
    if (state.campaign.state === ONGOING_STATE) {
      return <div>
        <Button type='submit' positive>Finish campaign</Button>
      </div>
    }
    if (state.campaign.state === SUCCEEDED_STATE
      && state.campaign.isBeneficiary === true) {

      return <div>
        <Button type='submit' negative>Collect funds</Button>
      </div>
    }

    if (state.campaign.state === FAILED_STATE) {
      return <div>
        <Button type='submit' negative>Refund</Button>
      </div>
    }
  }

  const handleInput = (event) => {
    console.log(event)

    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  const contributeInterface = () => {
    return <div>
      <Button onClick={() => HandleClick()} type="submit" className="button">
        Contribute
      </Button>
    </div>
  }

  const onContribute = async (event) => { 
    const accounts = await web3.eth.getAccounts()
    const amount = web3.utils.toWei(
      state.contributionAmount,
      'ether'
    )
    const contract = createContract("getCampaignAddress()")
    await contract.methods.contribute().send({
      from: accounts[0],
      value: amount
    })

    const campaign = state.campaign
    campaign.totalCollected = Number.parseInt(campaign.totalCollected) +  Number.parseInt(amount)

    setState({ ...state, campaign: campaign })
  }

  return (
    <>
      <Button type="submit" className="button">
        <a href="/">Home</a>
      </Button>

      <Table bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope="row">Campaign Name</th>
            <td>{state.campaign.name}</td>
          </tr>

          <tr>
            <th scope="row">Target amount</th>
            <td>{state.campaign.targetAmount}</td>
          </tr>

          <tr>
            <th scope="row">Total collected</th>
            <td>{state.campaign.totalCollected}</td>
          </tr>

          <tr>
            <th scope="row">Has Finished</th>
            <td>{state.campaign.campaignFinished.toString()}</td>
          </tr>

          <tr>
            <th scope="row">Deadline</th>
            <td>{state.campaign.deadline.toString()}</td>
          </tr>

          <tr>
            <th scope="row">I am beneficiary</th>
            <td>{state.campaign.isBeneficiary.toString()}</td>
          </tr>

          <tr>
            <th scope="row">Contract state</th>
            <td>{state.campaign.state}</td>
          </tr>

          <tr>
            <td>
              {campaignInteractionSection()}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Estadistica;
