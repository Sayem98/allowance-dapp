const Allowance = artifacts.require("Allowance");

// require("chai").use(require("chai-as-promised")).should();

contract("Allowance", () => {
  let instance;
  before(async () => {
    // instance = await Allowance.deployed();
    instance = await Allowance.new();
  });
  it("Should get the deployed contract address", async () => {
    console.log(instance.address);
    assert(instance.address != null, "Not instanciated");
  });

  it("Should get balance of the contract", async () => {
    // const instance = await Allowance.deployed();
    const balance = await instance.Balance();
    assert.equal(balance, 0, "Balance is not Empty.");
  });
});
