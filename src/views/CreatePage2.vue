<template>
  <div>
    <Header />
      <main>
          <sideBar />
          <newBusiness />
      </main>
      <Footer />
    </div>
</template>

<script>
import Header from "@/components/Header";
import sideBar from "@/components/sideBar";
import newBusiness from "@/components/newBusiness";
import Footer from "@/components/Footer";
export default {
    name: 'CreatePage2',
    components: {
        Header,
        sideBar,
        newBusiness,
        Footer,
    },
}
</script>
