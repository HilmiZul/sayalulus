<template>
  <div class="bg">
    <Navbar />
    <div class="container py-4">
      <slot />
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: "Prototype";
  src: url("../assets/font/Prototype.ttf");
}
@font-face {
  font-family: "Fredoka One";
  src: url("../assets/font/fredoka.one.ttf");
}
@font-face {
  font-family: "Rechtman";
  src: url("../assets/font/RECHTMAN.TTF");
}
@font-face {
  font-family: "Grestal Script Demo";
  src: url("../assets/font/GrestalScriptDemoRegular.ttf");
}
@font-face {
  font-family: "Quicksand-SemiBold";
  src: url("../assets/font/Quicksand-SemiBold.ttf");
}
body {
  color: #525252;
  background: transparent url("../assets/img/bg.png") no-repeat center center fixed;
  font-family: "Quicksand-SemiBold";
  background-size: cover;
}

.rechtman {
  font-family: "Rechtman";
}
.geral {
  font-family: "Grestal Script Demo";
}
.quicksand {
  font-family: "Quicksand-SemiBold";
}

.logo {
  width: 50px;
}

.bg-yellow {
  background-color: #f7e999;
}

.bg-green {
  background-color: #a5ffc6;
}

.bg-blue {
  background-color: #8bcbde;
}

.bg-purple {
  background-color: #8fa8f6;
}

.bg-red {
  background-color: #e6567a;
}

.bg-shadow {
  box-shadow: 9px 9px 0 0 rgba(255, 255, 255, 0.331);
}

.prototype {
  font-family: "Prototype";
}

.fredoka-one {
  font-family: "Fredoka One";
}

.title {
  color: rgb(80, 80, 80);
}

.text-grey {
  color: rgb(121, 121, 121);
}

.congrats {
  width: 100%;
  height: 748px;
  /* background: url("../assets/img/bg-frame.jpg") no-repeat center center fixed; */
  background-size: contain;
}
@font-face {
  font-family: "Fredoka One";
  src: url("../assets/font/fredoka.one.ttf");
}
body {
  width: 100%;
  height: 100%;
  color: rgb(77, 77, 77);
}
canvas {
  margin: auto;
}

.congrats {
  width: 100%;
  height: 100%;
}

.congrats .inner {
  margin-top: 120px;
}

.fredoka {
  font-family: "Fredoka One";
}

.h1 {
  font-size: 4vmax;
}

.h2 {
  font-size: 3vmax;
}

.bg-result {
  background-color: #ffffffc4;
}
</style>