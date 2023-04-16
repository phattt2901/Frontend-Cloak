<template>
  <b-container fluid class="p-0">
    <header style="background:#000;height:70px;width:100%">
      <b-navbar variant="faded" type="dark" class="text-center">
        <b-navbar-brand href="/" class="mx-auto d-flex">
          <img src="/images/logo.png" width="50"/>
          <h2 class="pl-3" style="color:#fff;">Blogs Tin tức</h2>
        </b-navbar-brand>
      </b-navbar>
    </header>
    <main>
    <b-container class="py-5">
      <b-row class="py-5 fullwidth background-animation" v-if="!isExitsLink || link === undefined || link === null">
        <b-col :cols="12">
          <h1>Loading...</h1>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col :cols="12">
        <article>
          <section class="tittle">
          <h1>{{ link.meta_title }}</h1>
          </section>
          <section class="content py-3 text-justify">
            <img :src="thumbnail" class="img-fluid pb-5"/>
            <div v-html="link.content"></div>
          </section>
        </article>
        </b-col>
      </b-row>
      </b-container>
    </main>
    <footer>
      <b-container fluid class="p-0 m-0">
        <p class="white-text py-3 px-5 text-center m-0" style="background: #000;color:#fff;">
          Copyright: ©2023 CryanTTP. All rights reserved.
        </p>
      </b-container>
    </footer>

  </b-container>
</template>

<script>
export default {
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    let link = null;
    let referer = req.headers ? req.headers.referer : "";    
    let domain = req.headers ? req.headers.host : "";
    console.log(req.headers)
    let validCond = false;
    try {
      let a = referer || referer.includes('fbclid');
      let b = route.query || Object.keys(route.query).includes('fbclid');
      validCond = a || b;
    } catch (e) {
      
    }
    try {
      let domains = await store.dispatch('GetDomains')
      let current_link = domains.find((x) =>
        x.cloak_link.includes(domain)
      ).current_link
      if (validCond) {
        if (domains.length == 0) {
          redirect('/404')
        }
        redirect(current_link + route.path)
      } else if (route.path && route.path != "/") {
        link = await store.dispatch('GetLink', {
          link: current_link + route.path
        })
      }
      return {
        isExitsLink: !validCond,
        link: link,
        current_link: "https://" + req.headers.host + req.originalUrl,
        thumbnail: link && link.meta_image != "" ? link.meta_image : "http://" + req.headers.host + "/images/feature_box1286687773745.jpg"
      }
    } catch (e) {
      return {
        isExitsLink: false,
        link: null,
        current_link: "",
        thumbnail: ""
      }
    }
  },
  head() {
    try {
      if (this.link && this.link != "") {
        return {
          title: this.link ? this.link.meta_title : "",
          meta: [
            {
              hid: 'description',
              name: 'description',
              content: this.link ? this.link.meta_description : "",
            },
            {
              property: "og:url",
              content: this.current_link,
            },
            { property: "og:type", content: "website" },
            { property: "og:title", content: this.link ? this.link.meta_title : "" },
            { property: "og:description", content: this.link ? this.link.meta_description : "" },
            {
              property: "og:image",
              content: this.thumbnail
            },
          ],
        };
      }
    } catch (e) {
      return {

      }
    }
  },
  data() {
    return {

    }
  },

}
</script>
