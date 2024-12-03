"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function Home() {
  const images = [
    {
      src: "https://www.gov.br/saude/pt-br/assuntos/noticias/2022/outubro/imagens/boca_escovacao.PNG.png",
      alt: "Dicas de escovação",
    },
    {
      src: "https://img.freepik.com/vetores-premium/escovas-de-dentes-de-desenho-animado-higiene-dental-e-ferramenta-para-limpar-a-boca-equipamentos-para-enxague-bucal-fio-dental-pasta-de-dente-e-dentista-conjunto-de-vetores-de-cuidados-com-os-dentes-objetos-medicos-para-saude-bucal-tratamento-dentario_102902-4894.jpg?w=1060",
      alt: "Ferramentas de higiene bucal",
    },
    {
      src: "https://sorrisologia.com.br/documents/37259750/37287069/22152-o-dente-podre-e-um-quadro-que-pode-se-to-slider_medias-2.png/562ebba2-907f-594e-b5a1-36ad6ba99b60?t=1622582490688",
      alt: "Cuidado com os dentes",
    },
    {
      src: "https://img.freepik.com/vetores-premium/dente-de-desenho-animado-com-pasta-de-dentes-e-escova-de-dentes_400937-356.jpg?w=826",
      alt: "Pasta e escova",
    },
  ];

  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
    <Header />
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-teal-600 text-white py-20 text-center">
        <div className="container mx-auto">
          <h1 className="text-6xl font-extrabold mb-6">Transforme Sorrisos com Educação</h1>
          <p className="text-xl mb-8">
            Explore as melhores práticas para manter seus dentes saudáveis e
            brilhantes.
          </p>
          <button className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition">
            Saiba Mais
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl text-gray-800 font-bold text-center mb-12">
            Cuidados Essenciais com a Higiene Bucal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <img
                src="data:image/jpeg;base64,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"
                alt="Escovação"
                className="h-20 mx-auto mb-4"
              />
              <h4 className="text-2xl font-semibold text-teal-600">
                Escovação Correta
              </h4>
              <p className="text-gray-600 mt-2">
                Escove os dentes corretamente para prevenir cáries e gengivites.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <img
                src="data:image/jpeg;base64,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"
                alt="Fio Dental"
                className="h-20 mx-auto mb-4"
              />
              <h4 className="text-2xl font-semibold text-teal-600">
                Uso do Fio Dental
              </h4>
              <p className="text-gray-600 mt-2">
                Limpe entre os dentes e evite acúmulo de bactérias.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition">
              <img
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXFxgYGBgXGBseGBoaGhcXGBgZGh0aICggGholGxcYIjEiJSorLi4uGh8zODMtNygtLisBCgoKDg0OGxAQGi4lHyYtLS0tLy0vLS8tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKgBLAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgAHAf/EAEIQAAECAwUFBgMHAgUDBQAAAAECEQADIQQFEjFBUWFxgZEGEyIyobHB0fAUI0JSguHxYnIHM5Ki0kNTshUkg8Li/8QAGgEAAwEBAQEAAAAAAAAAAAAAAgMEAQAFBv/EADERAAICAQMCBAUDBAMBAAAAAAECAAMREiExBEETIlFhFHGBkaEFMvAjQrHhwdHxM//aAAwDAQACEQMRAD8AjPlhQOIpJ3kejwotklycOe7KHsyYlvw9S/rSBZ+Fj4RXjX3ePHRiJ67qDM8EqSdr6QfZpinGXt60aOtKUAPUaBhA9mtLK8KXrqadP3ignUOIkeUx3Nt+EBwdzFn+cF2W1SlsnEEzDUCuXFmeFFuUVMCa6hst4bPrH2XdhxEkAgCj6V1EI0LjeO1HO0Jn29QolwR1iMmUfMXFOZ6CAT5zRh6Q4sTgFsjn4vZ29KxrDSNpinUd4VYpoTqBTOh60giZPDOS/Bx/POBzJZ6APtADfCIBhrvb6oInIBOY7Jlq7SSwz4JHWsDT7SAThUd9QIHtqyT8HrFUpJxMhBJOgBUf9qfeGLWMZgF4RLnAipA4DPiQIDnKKcyW2kxdbLPMlh5iUyxpjUhJPAEgnpGbskxDrVNWUpJxLJDkAkBKUjJwABy1h9deqZzzGdit6FrKHIVo9Aqj0bZrBkxhVjxHzhLd9hDpnSPvE1yClEMououHSo1owGRDweLcK1IIozHplSNdQG2g5EvE96OrrEBaeP1xgKfan/E3MvAn2muftGhMxZePjeyZaSsqyGQ12axn53apa1eEkbkgn5wJfxJlPWhBPDL3Ii/snPSqWUMApJL5+LfTpBrWirqIzAZ2ZtIOIxsl5Aj7yZbUb0yipPqRFs+85YFLcsbBOs6x6sqGKpwADPv2esfJU3EWxdTC/GXugheCezGZ0X6UksuVN4P7U9otl9p2oUNtI+Dj4w8n3bKV50IP/wAb/KFFtuOz1wy1JO1JIHQkgRosqflZhS1eGkpV8yVN4iDvB9wqGlntCDUKCuWUZSd2aOaZgfYrPqnLpAky77TJL4VFtUHF7VHSDNVbcNBFti8rPQwpJy8OW70MVhTZluJzy1jH3b2unIoohQyZWfX5vD+x37LVUjCo6HLkRE79O69to9L0bvG6yVDwinIe8V9yd3X92ilNrcFia5/REfJc1QyOmT/tCdJEdqzL5YUSQG3kv8TFtpkMHcaZM/qYAnzSQ7o3uz+0Umbr4egjdBMEsJNa5ewHl8ogqQFBwOTt7NA65x0+MGSWAqnEeI9nhuCvEDOYIbITQCr7f3gkSVnSnEDpBK5INcg3L9ous6MOZJ3gV9Iw2HE4IMyNlkEMFADeDpwg02B64/U/CPoYeYljtgrvEij9YQ7nkRyoJmZ04iqak78hoaikVi8SE4d9Tt3CAJtoGSQfT11idksylHJt7Rd4YA3kmsk7SqaSo5nOLEo0Ab63QwN3keIMd9fZhE7vk4S6n2eWkcbBjacEOd43u2yDB4mKvzHTrSLZ9naprzFOEQQsEZtXKoA6RNKlFTAg9fciIiTnMq7Yi20WLEaMBpWAlpVLVnz2xoZtmBqrkP4gefIBJ8AO3M9HaGLbAZJVY7akslyDxPKj5wVKs6phwyw/UDqMucC2a4lrUGonMlQLJHPMwzst+2eViky0L8ILMzrUNHcMTvYcIVa6KfLzODY/dtDbLcEsVmeNWwOEfM/VIW312kEtXcWYJS1FKADJOxIyffGMvbtBa7RaO6mAyJSamWDVQ0xKHmBpQUzziuSoqcjWKKenJ8znPtDRg37ZfPX94VLJUo/iJfqTCq/pQSMKSKkP6EDhF89JSKwpnrfOLVGIdh8mmCSlKQXSSkioIJBHAiNLdt/Ce0q0pCzklZorcCoV5wgzgKc4Lx1lQcb8+shzo4mtt11KQ6pZKkag+dPTMb4XSlgwx7P9oO8IQvwr/CdFU9/obItv66/CZ8oZf5iBp/UN23rtiRbGVtFn3hMgI1LBpUnGkpdwcwTnCSyBdmnkOxTkdCNH3H34Q0sS9SSG0+ED3xeGFKpYSgqWACcIKkihwhWYqPfbFVYJJB4k9hGARzCLbfuKteZ+WcDWe/ik0HRxCyRZMRD1OwUHXWHEjs86XwE8D8qxxFS7TgbG3zGli7RpJD0PGnV4apnCaPO+5NT6xkrRdvdkYsRB0/6id4BbGN0XPMk4VOFy1VQtLlKgNj5EapNRC2oU7pGLcw2eagFKNVPsYZv/AEnKKu/WHDuz+Uab6PC267aJhc09PjDFS0HIja7H6EJK4ODHBsjaU3lZpE4MZQBH4mZXUV6vGfn3dMk1lnvEapIq3DXlGnCKZD1+MRCQcx9coNLCnEB6w0UXXeQI8H6pavMN6DqNxhuJzgKdwRnp+0K72uoK+8l+GYKsHGLjv3wLdN5jF4hmWUMq5Px2/tBsquNS8wFYodLcR4lSRn1ETUoN+0WiWDknPcTFEyzrc+ENwbmKxOCDKDB50zaA2lYvRPGEAO22kREltCT6A8CI5CVPx2tB7GBuIfIWo1cltpETSlQq5fcIrslnObl9wHzg9CWyIPED5whiAdo1RmSRNp4lPz+EQFrUcg44xYuXpzyPygOYgg5QKgGESREUqQcqjbt/iC5KWIyz+s2iyy2JztGWXxaDE2Bi+zY3xAil7IhUkftDEAMQ1dedPlBcmckF3yGuXL5xTNA1fZp8FRWEAZt6V5Qk4MbxDjaSfJl04xKyqWtWBIUo7mp1LCIXbYVzSTiKEDzK+AfX2jSSUpQAlIIBySPOraSTlz3ZZQl3C7Q1Gd5TZbpAqpRUdg9if4hgiWB5QAf6RXrERY1KqskAVwJoObVV6DaIOkoAAYNuiYsTDziL7dLJlqd/KfbdGAnyfECkVxejx6hNUMjw/aMAuU0xUs6YgDzYeoEIfIbIkXU74MQ9oF4jio6aA6muXB/ePvZeahawldBAl4yiuuuFTf3HIcYRSbQUkgulQOWoj2OiYCvSZvS2AbGekdqrulJlulnYn65R5fb0MrmYItN9TiGJJEK59pKjWPSAlFrDGOYwsCQddYpvFQJYZQtE0jKkTMw8THEyXBacF1cFmybdHo/ZC8++lklipPhWNoOrcH9RGJuy41TRmE8oaXIF2G2y0rUCiZ4SoZEE0O4hTcidsRdQa7AVB8w3hpXZV5mGxl173d9ntJSxMoJXOG9KUkhL/wB+FPQ6wgs8pUyYzErJ9Tn60j0Pt3YybIpafNKod8pRTiHJkn9BjD2CaUCdNS74WSRoZhSmm8BSiN4hvT2a6s95Pcmmz2jFDoV3MhONY88xqA6pSKgkbcqUGsNpFgWazFlR2LVTlUN0hb2cswCXKT7Q7Son8zbmhdjHOBHVqMZMMu6QhXgKk/2nxIPI5e4hVbrCiQpaCSLOsjvUmpkqJZE9BPmSCQDqxYvmDrJJAUF4iK6Jc+kN78UmYgHDUBjiA8QIYpIJ8pFOcYlpVoT1Blnm9pkLkzFS1UILEA02gjaCGIO+Hl0WgHNhzhlY+zotSFAhYmSpWGU6vwJJIajrbYpVEhq0ZHNsa7NNMqcMKqEEEkEHIpOozh9mGGRJ68qcGP0LGRKTyPwiRRiqCkbHAH7xGwl8lEDjU9YNsqQ9Sp98RscSwbwJNnO0Hh+8ZXtLZe7nOKYxi51f29Y205AdwctKfOMn2wUHQNg+J+UOoYloi9QFmiu60qXKQp11SHNWyrui2athSvE/TQFcSiLPJAYqKAwo7moo1c421xdnAAFzglSswlvCn5mIep6hKefoPWNDeUTN2K7pkyqUONoy6mnSGCbhm6pHAN8o3FBFffDbHj2fqdmdsD8wfEmHmWBcsVSpuDj0ikTGqzcv2jfYwaQBelxImBwMKtFDP94dR+o6/wBw+3/UIW+syKlg/tHwPsHWF96SlyZhStJfQuwI25QuXbS8euiahlTtCNgjyzkyzmOYL8nAaPk+co+UV2ur2FIrEsg5ONob1o8HfaBkQGfM/QgjzmaOMShC1EF6kafTRKxSFTpgSRvJ2DXLXKJy1IJPhQ+TjE/vGmuy73lt5cTOQ7ts3U94U76YQE+WZAYBI8CaIH5iPxHbXLrsZjZkAVZyczr+w3QRKkoR4Az/AF9NEHSijZ1iQwtWZJSjU7unGBbLbQdlCRTa+XWLLRN0EKpFjRKBwk4iXqeR9IWW3nAbRnapmsY++S04rehb4/GHFstlGjN3ra04Sk1JStQ3YRiPoIU2WbaJvXyRd2YUFz00cgKV0Hu5EYTtBYJkm0TEqcYT4TtT+FXMfLSNb2EKpk5Sh5WYbw7n64RoO393pXIPhBmOMDEOKjF+lvhHp12eBdpPB2+UjpTU4AGZ5Ki2keaL5CsZZIKjsidouKb+UdY2fYC7JCR96cJfxUru5Rdd1KImV3M9ajpbTZpcYX5f4mJn3XNFcENezl1pXiVMUAU6KNeQja3wqWlRwVSDQnWMj2mtUsKQpFFMX+uMS19S93kx9RLr+irpAtH5juStCMqARne1F4CatIT+F+Tt8oNuS659rSVBQly/zly/AawJevZVclWIL7wZ5MW6+kB04pruwzeaJ6w2WU4Rdp6bZwLTZk4hSfZ2VzSP+ao8ku4KwrQc1IxN/VLIUof6ArpHqvY2aFWOzHYVJ5DvG9hGBlyEzTOTL8M+zzpqkgZrliYpWJP9aC9NUtsinotmdf53nj9VwrRz2YtCcGF+QaNAJIVsfRwPfOMLItpSUzEpAxO4HlxA1wv+Eggto7aRsrutmNIJDMNMBH7QF9ZU5jaXDDEvAKS7DpSBp9qUS2R0wg59IPWv+l99H9BA80oq5bqIUp34jjCbFPXLKFgqCkFw5NfnBHbW65dos3fJAGEFcs7DnMkltNRspvhaiZLNAp+BPzhncdoTLUQpzLWMK32aEPmxr12w+mzScGItr1bief3ZalpLNlu+VY0dlWfxFNdpb0eKe1NzGzTnSHSajY2efPoREbHMxDyCurmnSNt+UyswydLSHcg656czGQv+zKKpQyVOZSRqlBLIfZ4QVcCI0FqtMsE95/lIrMANVnNMpJc+Y57EvCO7pi7Xa+8V5pqwkNkkEgONgCaDcIZUPDQuYq5gzaRPQ+x91AATVDIYZYOiRR+em7jGylppA9lkBKQlIYAADcBlDSTKdMfMpW/VWlz9PlNdsRXPeA5koipIg60L0jN9r560J7wVCUuw3ZxLVQjs2dzxBc7RzZl0hhImRk+z1t+0zChCvAjCH2kgOOWUau1IEss+WsLs6azpm8TsCB95wI4iTtrdQmyFEDxpGJB3jMcCKdI8l+0K2mPdbQoFAjxO32cibMSEhkrWkclER9N+nv8AuXtsR9ZmdptkpCVMp1HTEzdY+zJYoQEngzfCCZnizSa7HHLSIWmXQACm8JeCzLpVJlLWoJLpD7/SnvGzsXhLE513AZNGUu1u9SlhRyS42HQDeI0lmSlaSVKBBdNNmTcXeJrj5hN7Qy02QDxgDEWL7v4gC0Tg7atzhhabQGAegjP2pwfCWTWmrku7wu4rnCzK843lZtviKWdmD7Tv2RRbZ4Lir8fYwhRPUlbKJJJLO/lBZ+rViFqtVXByJ94DwzD1CTve8Ey5ZUo0GrxhLFeyrQucSWR3ZQP1qAc8geTxqldm/tiwLTO7mUD4ZKSO9WanEsmiaAkCpYVYiNBdty2CSiYE2VCkoBdUwlbkYwQQTm6SGbUR6dVCImWPmP4kVzPYcKNp5we0n2b/ANvZcKwCPvWIJTQlIByL0xbhG6u2zpmIXMmzQFADzFyYZSLBd6kPMsElHgSp0ow+Z6OkAgilDWu6Pl49kftCRNsiwEqAJQskKTTJ6+vUx1tS2YNe+OfUy79NdKCRadOeD/n7zG2u0gHRoSXtfGBSVyyyhQvkRv3PDC/bBMkzhZlIUJhq58pG1J/EN4ii29lpiA8yhIcOIXXWlZ/qT27rhcmKTv6yV0zZtsSs4kIShOIklhs112CFdvu1Ch5iTWpBjQ3XdCZUqo3nj8IGvBAKSRkKc45bgLMV7Ca3TlqcXnJmi7LXpZjZTKciYlIw7MoEtdoBCnzDNGDsAmhRKRkS3WGCr2WpSZQH3iiEh9qiw9THP0f9TK4/nrJU6xFrOrI/naekdkZLSUAUGJah1P8Azjy6Usm0GahZQozFrCk5h1E/GPXrdMTZrLMKcpMghO9RFBxJCOseW9nrM6xnTZDukOAzzw+pGSFm1T2aTaLIDKQlC5QAcE+NRABKgcgpkh9FPkCBAfZy8cBMqYhlAsQWDEZiNBc94/ZpiFl1y/KtJo6TQ57jlEO21xy5r2qyKEzCfGQalOFxiGqht1AOws84tSK3qfbiTm1DhJG4NFeEDMreE9x2gq8JoRDY2YiteanHqIjK4OJWGzvBJs5T0ccw8TE8/i6Mn5RYlJxAseR3bhHKlqD15ElxvqI3biZvG2AWuzGUsDvJYxI3pFSnk55E7BHndsHcrIHho5JPl0dtu7bGonXx9naYD4wXSnhmSfywl7e2BM0IttnrKneYDIKFK7wXSf0HNRi2oahlv/ZHadJwsytotCpygkPhGmtcydpOpjddjLAUTpalBqlh+kgaRnOzl3h3UK7xGuQDLKSColJBDClK7on6x9YKD0h01bZM9Ikq9hB1lWA9YUWO0haEqSaEZQSlceD0/VeC3EFlzIWuXmRCydZ+8SUHkYcEvnFRlgGJWOmzWvB5nYyMTNXVdf2YkBLB9IbpUVloOSgExasolh9Ya3TeMfELbe8XxtBLUoJAB0jyC2zgqZMUz4lqPl2kmNv2yvnAhTHxKGEbnzPIR54Jw0+Eez+n151P24H0hrtN5Msi11dQ4qDe0TShaSHAUMnyPtFcokDzE7nHzPtH1FoVtHx5Ma9IYSZbiMrFM+9FABXd+EwsnX8mx2dS5iFKQLTNlqws6QqZMUlTHMeUfqicu0YVJVUsQctIpvJEmYZqSQZcxaVqSoaoCR0OFJie0ov7xtAtsCD3l929pETQ6ZicNWABFN75GK7wvUJLgKUWyCSXfYRpAS7vlIT90EoOxIYdBEFpKUipSDkfxq3JGnGI9alvINveS/FPFVtvdSllXdqBYCubCvlzh3cKEgd4T3izlQgSw4S+vjq+VBGUXeAM/uwGQkEzGNSBoTmSSQH3xq7gkqRhm4w09QwIzSToQQ7MSNPwnRUekoKLqx8oVLNY2/EYnEiWo0UsTEuQk1AW6g4ck4cNacc4+2xKQqaE1mrA1rgXRKhhJxKYAkAVA3BqLYhl92qWfIwVk/iWtykkauNQ7bYPTaFElONLpEsL8IwnwOFpJzKipsNaDLUhLZUrGlSFTA4wByScIGGpmJ/IFBxmc2Z4hctomBAnJWcSl0cFISnGQQtJ0cK2UbZBCpbkEunwLQkEJSkEh2SkuQ7KZwAyTlR1ypasCQjGgKQDtwKSnElLJ0UC5ejAvHDI3E44OxmqVLk3jKwLThmIZctWZS/lWNxGadhjHXrbFLV3M0ALkOk7aCnoQRxEN7rvEImpWFJwK8pRVE1RQSSGqAGI5ivhhT/jBdk1NqstosxaZNJkq/KSKpKtGw4n3DdFTp8RWSTgjn0+s7peoHS24Iyp49QfaV9ply5dnly0kFZSFKI0J0eMHa7f93g3ufhGqvi4V4QQUksHZwH1Id6PGMnWZUtY7zy+gifpmR9x9p71z6asDfPeNbiQQACGc674bXNdSZl4ImNSUFqJ0cMEv1J/TCifeaGfGCdusbrsrduCSkqDLn+JQOaZYqx3kEA7Cs7I5iwJbjO08u8qRpif/Ea34bOiV+KcvGoahKWIB3+QfpMJ+ytmatYXdp7z+1WxahVAOBH9qSa8y54ERorpnlCWCQOUVhClQXvPLDBrM9o4tMkKSMRXwGFvWLrgtndKdIUQThWDkRrRINXq+lIXm0KP4kgHQAj6MfZNqUksG4lI3wtdSjaOOluYd2kuZMsfaJAeWqpDeUk1BrQVFNHGhELbFfgZiHVlVq9MocXbfRQrCsYpaqKThbmN+fFyMoUdp7mMoidJOKUqqSNH04ceB3tKCwZxFBihxCBbgWciuz+Irt1qEpJK3f8ACAzk5gZ7qlqVjOy7x2k/P4wnvi8FKOFy+R3f0jftMbX0+T7THvwPeV3rb1Tlku7nTI7h/SI3XYCxqMpdnmPgm1S/4ZjUb+7LY+E6Rkrguok41jhVo3FkVgAYk/qLj0grrgPKvEXVTqyW5gNssZlqObg1qPjVjnwMSRaCo7Rw+UOu0qe8SieCQJgIWxNFjzZav6KQIxv2hUtTB+dAYn8PJxHB9pr7tvMyTkopOe7eHjUWe2JXVJoY8wl2wF3SDveDLNalg4pRLbKNzrWPP6r9O8TzKcH8GccNxPSxNiMy0iMdZ7/WzKFduXvFdpvpZoB9co8odB1IbGIJWaSfeWEwmvXtAAM3Og1MZ21WmarIHoYWTpCyakx6fTfpp5sb6QSDK7wta5iitWewkMNwpAqZS9npBM6QabIh3Ue6gCrhYBE3hlEVKRvr9boHmWZzQEH+4F9dYs+3JapT6fL4xX9sDs4PP1ziAAy44nd2aOnm79WGUEosLpKkNiSfEljyIfdpugFVscaZ7T9dYvsl5YFBVWyIGwwu6nWuCIDIrDBli5wQkUC1kgAMGc6mlWFYGm2c+IqLqZyrhkBsDvSDrZIlhSVJPgYzNwB+FOWUYTtb2jxjupalJSaqUXTibQbU/tENVDu2hfqZ5lilWIMCu9WOba1DxhSgnw6glbs+Q8I6RvbukS0IcqSlTO6AkJ8KR4iT5FpLZHQUcCMX2Aly5i58s1+7EwFqPLVUbwyq7Q8bRLfZDKWFBQxGapwSgkYmlqLMQSAAXrntPq3jG3aV9IPLLZSTMWua3hZQStQx4UsnCSCQXBq+ZxPlWLrRZ0olElASV4QQnxPhSELWkigOFgNmHMPE7CAj75RAUSrETkhJDJSkOQkEIFaks1A0Vz0HuyZilAKTNGGWHKQWdkl3FACBXEqjRNn0lgEJXORgUvEoqUmaG8rMR4VHzeEDN68xAdpBmSilRlkqCu8CVVJcSUkkhkDEGADMxLmrkzQiXKNVEYgcYUFMtTEpVj82SKVNC9YGs8pfeqwJVSYvAXd/AmaywagEk0IDM+ZEENp0sssxKsJMvEUplpBACUoKiGSkZ0SC5d65B4l/i1eCpdhss78aLSgh9WRMB6h+sfLusypxCpp8SFhkgulCwUiWhLAYkjEohRrVoYf4gXUbSuTICPu5SSsqNE4iMCEuaOBiJ4iKaWVUZm44+cS4LOoGx5z6RKrtEm1SJZBDNQ67wd8Zq88BSpKwK5GNTd3YiQnzzTiIoJZwgbz+Y8RHn3bi7Z1mmhPeFcpXlUzF/wAqt7Vej8ohppD27N9+Z6zdbXXVp0/biLux9y9/bEy2eWglS/7EnLmWHMx6T2xvjubNMWksub91K3CrqH+4v/bAH+H92CTZsWUy0EV1CA7HpiVxIjNduLd9otXdo/y5P3aQMnpjI5gD9Megf612DwP5/meN/wDOv3MWXDZHL0EbCXLATmOucBXRdygkeIDdiAPzhuixmrq6OT1aDtsBPMytCBKpahtDc6RYVE5FVNj/ABi+XZdoP+kt7xaqxJYFzyEJLrHBTAO6JOajDW7Ld3YMqZ45S8wWLPmRlzGvrFaLNvI5P8oWdoLQmWiijiIzoGSM1ZZ1AG87o1HJcBYLqoUkxX2vutVnUJssY5SvKsVCSXqrdsO3NjSMzddnC5gKvLDns92gmBRlLSJkhVO6LeEGnhemWYND6xoJnZaWB3kgvLz1xIycKfY4zqHD5gqvdtK4EiQamyZdYkJowDDoOogmbLI8pGVNntWAZM/AwJFOA9hDCWoKqDXiQ3pHlMTnM9FcYjG7ZZXKnSFF3HeId80iv+2vFIjM3lZA2IBtzHPXLWNLdk3u1pmapIORL7QSdIrv27koUoZpJOGj0LEPvKSlX6oaGyur0iiuGx6zKSaUcA84MAO1oGmhYUUyk+JKSpRIolI1MQu69lTAMRqCWI1AbQ5Qwo5XUBtBDqG0945QCWep3vHFFcug15QKbbTLoYHVbiTs4mFKjRpYRmpjQEg/GBpoI47/AOYGkjXGRuG2JuQc0waqBBJzLpclJDKd9GIbltihdiW+Q/1H5xNEtQq4A0+hESpWwHmIMZHeCcekcFe1xzPxMUKnpdq/XAwbXYRz+cDJs4ckknpE4IjjI4h+WnT4vFM5sgB6/AwYqUnJn/ndWKFBAoU9QpveOBnETrstSUnCtIWghiDVgc2fQ7ItvC4JMyVhKe9kGqSKzJfAipAyfMag1gKYA5GX6TV4vsk9UouhWeaSKHiPjGMu+pdjBwODM3Zuz9pu+ci02f8A9zKSXIR5yguFJIGYKSQ46CPQSiTMQiclf3BlqZZYOMT4HHjSpJBxDMEHWKbPeUlRckylnMjyneXDHiQ++G8ma6ClSUzJa88BAfR6nNqZl4Jriw02D6/z/iCtWk5WLLImYFKWolafEpQ8iQHThwu1WwnUGupDBIlpxqWQGUUFSEqoHUlSFfiSGZRU2bDSkPJVyIV/l4VpUEpUlToXhSRUgu5YM4Z4C/8AQJuEAywkhJSyQKUaWzhiAAHDNsgfCYb4/n0heIp2zFqkpmsMCsJmEgEHCVKOEghIqwC1HQ7TWPmLEEpSszJoJZSTQMUiaHeiX8QJdyzswEOJFyzO9OFCu77pEpmKTVi5IA8KADRw+LdVbbL6sV2oMudNE1aT4JMsgrbzBKyCQhOKrOOcElLvsBMa1V5j+6LOEpQtmKXKfE74h5qAaHzZk13wRbFUrUjTQcflCu5O0YtUlNpAwkkpKX8KFDOuoAIYxG3LmjIYicmD6576R5fVMwJX6f7jq994+l2JHdpKhnVJAyIgK3WOVPlrlqQFAg0IDMflBRn4UypSyxMv1YU94Wy1LOMgjykANqCamHIVUAD0/Mzc8zB2y9DZkTFD8AMqX/dk44ECn9BjJ3HIxKdn4/GLu0loKilGjlR3qP8APrDG4rAWD+8epWoSvPrJGOt8ek0ljcAVDNkf2gpLiuKu4/tEJMunrmRFsxH0W+PziXIzK8HEmZqhnXl+0fAXq59KdKmIpToajd9Uge0aMDyMaFGZxMumWhKQVEsAHJNP5jzztJeJmTCN4cbPyp5DPeTDztFeAQG1DPUl1ZpB4eY8tsZi6rIZszxZO5Ji/p6xWusyG9y7aBNH2Ru0NjUC+ka1E7AcSThPDPNnbPM10csawDYpaUJADNwgnEDkR1p7xG1h16pUtY06ZdPssub5MKF6pJDHek5DhQf20BWGSUFiC4NRUHgRmINmtkw5fBso6da0kYZiBMAHhKVYZgGwE0UONB6wYIs9j+P9QCCnuPz/ALnSrYG9GhpOWqd3aUjEcIDbFBIxE6ABHdVhTMk2RCe8UVhOoBSVB9CUg13NoYGvXtGSMEkGUgs5PnWwCQ7ZBkim4ZQxKQoOe8BrSSMdoP2oBSFSbLMHjbvjosjIJLOEjZrnSF10XaJIJ8yyKlwOSd3u0fUWo7ugf94NlTMnbiA/tGPY+NPacta5z3lMyXicONuf7ZxOySg+XpSCFnjxYAehi0Fsmy+tsL1HEZplUxCRt6RKWgaDq/ypFiZwJ38flHT5lNOP8CM34hbT7hSqhLcvpo4SR+cDl+xgUWk7E8jFS5qjUgQwI0EsJpVc25ERAHaP9oPuYFNqIFFEcFD5GKTNWX+8Po/tCQpjNQhkycRq36H+MUTZuIZ118PyMUm0uGOLoP2jnS1VfXKNC4mZkJi2FAPYx8lTify8844yxUuTw/mIiQzebhhPzgxiDvLJhJ/Jy/eCLuss9SiJWeZIUwA2qLgAcY6zWYkgMoqJAAYu+mlI9JuC60oQKOP/ACUKFZ21fDsG8mGU1azjtF3WaB7xFYrotTArmyz+hdOYAHMAxVe1un2ZONaZqpYzXJUVYd6knCocgY3ogW32YKSSAMTHgRqk7QYp+Fr7bfKS/EOed55lZ+1lktFPtrv+Gaop9FYXgmZ2esk4OZEiYPzAB+RHzjzP/Ee5RZrYVSxhlzQJiRsJ8w5E13vHdnbSTkSDtGcS29KR5lYyiu7OxAnq1y3NJsqVpkoUhKziIJKgCzOCSWo2ugh1KnIby4uDe7xgrFeVpT5ZpVuUx9w/rDOT2iWKTZKSdqaH1f3EQPSxOTvKgVxjiB9pr/vATRLs9jMpBUAJygJh/uZBITzeHlvQyWmzGSmVinlLAHbwBZZochvjrPfslWq0H+sOH419xGf/AMQ7YfspRKUFrnqGMoNAhIDjMsKJDb1QSjUQmnEEjSC2czzyzTFWieVkMCokDRIJoOQYco29jQlAyD/WwvGc7N3WoByCOX7xpcqP6fvF1pBOBE0qQMwoTk7up+Mcqcnb9boExaU6CKjM+qfCFBBHFoUuYNFHgTA14W3u05uo0TWm2raDM8Iqm2vuw6mbQVd9gbMmMffd6mYoga0pkB+UfE68ofVTqOTxEW26RtzB7dPM2YwJI9yczxJjX3Bc5QkF65/Twq7L3O7LUKc+uUbWSBlXdUiM6m7+1ZnT1f3GV/ZSRlzBEVLsqxr6ftDA4hw4j5R8mKJyYcojFhlekRJOMxsIw4ioJBXkCSzk6Zwg/wDWlypzLViwKIUPwnRmSQ44dY2k6SJiSldQoMQ30YU2Xs1IlKKgVKVoVsW4Uod7PFNV6AHUN5PZS5Iwdort97KmKBVpkAAEjgkUHvtJiuTLxly/1yhyq6g7kg8gfhFqbOlDZch8o43A8ThURzA5djGj8x8jF6bMBqN7J/eD5LPsHP8A5RNYBHmI5j4mFGwxoQQXunYgvp5R82iIs7NrwSKQWVBIrVt//wCooXatxHEnSOBJ4nEDvKpspsvYRAyTspx96Ry5QzpWtSS0SlED8QHX69IaOIHefV2YDRxzijuzok9INTOFSFpP6QPhFE6eSaM3P4COQtMYCHrVWoHHCCYpYHN32tQdItQg6gnhX5xFSk6gj64QEOVpk1pny+Ig6XLNGz2N7wEhSDqfn7xcFAGi+p+YEAwhCEzCr+H/AIiOMnNx1MQCyKjCeYf0pFjq3nkmAxChVx1nopUOQwaoSVD1Aj0uzpAQkDLCG6R5hY7StC0Ko6VBW6lWo+cej3XakqQkA0bwE6p2f3JyI3Rf0bDBEg6xTkGGCPsc0Lr3twQlSQpi3iVohP5jv2DUtF0jnif+M05JXZgM8Mw8jNWR1DRiLstRlqdn4Vg7ttef2y1rWgeAMhGvhSAB6AV1z1j5Yez61JfERCmK480cobPlmouztLIYBZCTl4g3whv9qkTGIUk7MKhGLT2XnfhmJ4KBTA1quK0IzlJVvQofFjEhpqJ8rSoXWgbrPQCkEUd+I99Il3e0jr8kx5q8+Xmmcj/U3uRF0u/Zqf8Arq4KSk//AFjPhG7ETvil7gz0dNNn1yj6kPoN1IwEvtJN/wC8n/THxfaSb/3z+lI+Rgfg39oXxaTbqWADiDcqeppCW331JSDh8R3USOKteAeMtOtsybn3i/7iSOhp6RbZrinzjWnMP7w1aVTdzFtez7IIPb70VMNC527NyRoPUwZcdylZBVk8aG7Oy6JbYg5+v6o0cmxoAo3Q/OBs6pQMLNr6Yk5aUWGz4AAzcP5gxSBsB6f8o+90nUtz/eJGzJ2+o+EQFsnMtCyrCNQ3IfOIpQNr+hi9UqlCfWKcChqevwjszcSaQ+tNKiK1SjVm6iJqxZMPX5RWqUdUDl/McJ0r7o8vrZA06Tqw5U5ZRbNUx8vNyIqmTnzxaauPeGqDAJEslkaZ7HrEJiDq/wBcRH0qTqFbjEFkEZ/PrHd5kiA2Tjc1f4jiob9Kke0TQQ74gNrvEVSw3nB4fuIIGZiBulzUHiPqsTDCpYDY3rQR9VLcsB7H2i5FkVm7cif4hhcQAplUsgkOrq/8QYLKnYPrnEMTUI9H+NImlZ0Dch8RAFieIQA7yKlgfiAfYD6tH0rYEpmE6UxfOOjoPTBzK/tCjmx3fyYtQt6YeDED2jo6BYAQhPldQsDdWJsQzPzEdHQomFifVLJosDm3ypB1gvhUlwhSSk1KFVS41qaHeC8fY6GJkbiC2DsYyndsZmF0yQrcJ6/UM7fqjGdo7Xa7Z4FKCJT/AOXLBCTo5ckqOjkmOjoYb39YvwE9ItsHZ1KC5r9cIdS7PRgS3AR0dCWctzGqgXiEoS1PFyIb1FYKAyb/AMR8BHyOhTGMAlC7INnUD+IonWNJd0pPIR8jo1WMwgSg3ah/8mWeUXpupH/aR0Hyjo6NNhmBBLU2FAySByggJTtNNuzrlHR0cN5uMTgpO08iY7vEmgKvWPsdHETszkE/hKs8/owSFKNMT8W+cdHQs7whtKVkg1CfrnECToSP1K+cfY6CgypQJOZPQ/8AkImzDVvrfH2OgjOlGDlq505PExU1KesdHRw3ncT6mWDqOXzxR87sCpDjr84+R0Cdp0mqWk1dn0p8U5RBVkGTAjbSOjozOJvMrNjSK4SebN0JiC5NKAg8SRHR0aHJmFRKxKLOSvrHfqPUfKOjoYDmCRif/9k="
                alt="Alimentação Saudável"
                className="h-20 mx-auto mb-4"
              />
              <h4 className="text-2xl font-semibold text-teal-600">
                Alimentação Saudável
              </h4>
              <p className="text-gray-600 mt-2">
                Saiba quais alimentos ajudam a proteger os dentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl text-gray-800 font-bold mb-12">
            Nossa Galeria
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden rounded-lg">
              <img
                src={images[activeImage].src}
                alt={images[activeImage].alt}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={prevImage}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
              >
                Anterior
              </button>
              <button
                onClick={nextImage}
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl text-gray-800 font-bold text-center mb-12">
            Depoimentos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600">
                "Depois de seguir as dicas dessa clínica, meu sorriso nunca foi
                tão saudável e bonito!"
              </p>
              <p className="mt-4 font-semibold text-teal-600">- Ana Silva</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-600">
                "A atenção aos detalhes e a dedicação à educação bucal me
                impressionaram profundamente."
              </p>
              <p className="mt-4 font-semibold text-teal-600">- João Souza</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-teal-600 text-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-8">
            Entre em Contato
          </h2>
          <form className="max-w-xl mx-auto bg-white rounded-lg p-6 shadow-lg">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Nome
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Mensagem
              </label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600"
                rows="4"
              ></textarea>
            </div>
            <button className="bg-teal-600 text-white px-6 py-3 rounded-lg w-full hover:bg-teal-700 transition">
              Enviar
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        <p>&copy; 2024 Clínica Sorriso. Todos os direitos reservados.</p>
      </footer>
    </div>
    </>
  );
}
