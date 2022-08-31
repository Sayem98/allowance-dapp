const Allowance = artifacts.require("Allowance");

// require("chai").use(require("chai-as-promised")).should();

contract("Allowance", (accounts) => {
  let instance;
  let balance;
  before(async () => {
    // instance = await Allowance.deployed();
    instance = await Allowance.new();
  });
  it("Should get the deployed contract address", async () => {
    console.log("Contract Address:" + instance.address);
    assert(instance.address != null, "Not instanciated");
  });

  it("Should get balance of the contract", async () => {
    // const instance = await Allowance.deployed();
    balance = await instance.Balance();
    assert.equal(balance, 0, "Balance is not Empty.");
  });

  it("Should Deposit 10ETH", async () => {
    await instance.Deposit({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });
    const new_balance = await instance.Balance();
    assert.equal(
      "0" + new_balance.toString(),
      balance + web3.utils.toWei("10", "ether"),
      "Did not donate the exact ammount."
    );
  });

  it("Should allow a new address to the allowance", async () => {
    await instance.Allow(accounts[9], web3.utils.toWei("1", "ether"), {
      from: accounts[0],
    });
    const person = await instance.Allowances(accounts[9]);
    // console.log(person);

    assert.equal(person.isAllowed, true, "Person is not Allowed");
  });

  it("Should withdaw the right ammount for the address", async () => {
    try {
      await instance.Withdraw(web3.utils.toWei("2", "ether"), {
        from: accounts[9],
      });
    } catch (err) {
      console.log("ERROR:" + err.reason);
    }

    const person = await instance.Allowances(accounts[9]);

    assert.equal(person.value.toString(), 0, "Withraw problem");
  });
});
