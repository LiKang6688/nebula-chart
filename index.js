import { embed } from "@nebula.js/stardust";
import scatterPlot from "@nebula.js/sn-scatter-plot";
import comboChart from "@nebula.js/sn-combo-chart";
import barChart from "@nebula.js/sn-bar-chart";
import lineChart from "@nebula.js/sn-line-chart";
import table from "@nebula.js/sn-table";
import connect from "./connect";
import "./style.css";

function init() {
  connect().then((app) => {
    console.log(app);
    const nebbie = embed(app, {
      types: [
        {
          name: "scatter",
          load: () => Promise.resolve(scatterPlot),
        },
        {
          name: "combo",
          load: () => Promise.resolve(comboChart),
        },
        {
          name: "bar",
          load: () => Promise.resolve(barChart),
        },
        {
          name: "line",
          load: () => Promise.resolve(lineChart),
        },
        {
          name: "table",
          load: () => Promise.resolve(table),
        },
      ],
    });

    nebbie
      .selections()
      .then((s) => s.mount(document.getElementById("selections")));

    // nebbie.field('Alpha').then(s => s.mount(document.getElementById('object')));

    // create a session object
    nebbie.render({
      element: document.getElementById("object"),
      type: "table",
      fields: ["Alpha", "=Sum(Expression1)", "=Sum(Expression2)"],
    });
    // .then((viz) => {
    //   setTimeout(function () {
    //     viz.convertTo("line");
    //   }, 3000);
    // });
  });
}

init();
