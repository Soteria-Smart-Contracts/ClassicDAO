<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script 
    src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.6.1/web3.min.js"
    integrity="sha512-5erpERW8MxcHDF7Xea9eBQPiRtxbse70pFcaHJuOhdEBQeAxGQjUwgJbuBDWve+xP/u5IoJbKjyJk50qCnMD7A=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer">
    </script>
    <link rel="stylesheet" href="css/index.css">
    <title>ClassicDAO Dashboard</title>
    <link rel="icon" href="Ressources/Images/logoico.ico">
</head>
<body>
 <nav>
    <div class="menu">
        <img class="logo" onclick="WelcomePage()" src="Ressources/images/logo.png" alt="logo">
        <a id="menuone" onclick="ChangeTab('menuone', 'Crowdsale')" class="Minactive">Crowdsale</a>
        <a id="menutwo" onclick="ChangeTab('menutwo', 'DAO')" class="Minactive">Governance</a>
        <a id="menutre" onclick="ChangeTab('menutre', 'Staking')" class="Minactive">CLD Staking</a>

        <a id="WalletB" onclick="loginWithEth()" class="wallet">Connect Wallet</a>
    </div>
    <hr color="grey">
 </nav>

    <div id="Welcome">
        <div class="div-center">
        <h1>Welcome to the ClassicDAO Dashboard</h1>
        <a href="/">Go to index page</a>
        </div>
    </div>

    <div id="Crowdsale">
        <div class="div-center Crowdsale">
        <h1>Welcome to the ClassicDAO Crowdsale. This is your opportunity to become a part of the future world of finance.</h1>
        </div>
    </div>

    <div id="DAO">
        <div class="div-center">
            <h1>helo</h1>
            <a href="/">Go to index page</a>
        </div>
    </div>

    <div id="Staking">
        <div class="div-center">
            <h1>Welcome to the Dev Server Staking Page</h1>
            <a href="/">Go to index page</a>
        </div>
    </div>

    <div id="overlay" class="overlay">
        <div class="div-center connect">
            <h1 class="connect">Please Connect your Web3 Wallet such as Metamask, TrustWallet or Brave Browser wallet in order to participate in the Crowdsale.</h1>
            <a onclick="loginWithEth()" class="wallet middle">Connect Wallet</a>
        </div>
    </div>

    <footer>
        <div class="footertext">
            <a class="footertext" target=”_blank” href="https://docdro.id/Le8sKd3">Whitepaper</a> | <a class="footertext" target=”_blank” href="https://twitter.com/ClassicDao">Twitter</a>
        </div>
    </footer>
    
</body>
<script src="JS/abi.js"></script>
<script src="JS/interaction.js"></script>
<script src="JS/animations.js"></script>    
</html>