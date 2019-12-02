<template>
<div>
  <Header />
    <main>
        <sideBar />
        <registrStep1 />
    </main>
    <Footer />
</div>
</template>

<script>
import Header from "@/components/Header";
import sideBar from "@/components/sideBar";
import registrStep1 from "@/components/registrStep1";
import Footer from "@/components/Footer";
export default {
    name: 'CreatePage',
    components: {
        Header,
        sideBar,
        registrStep1,
        Footer,
    },
}
</script>
