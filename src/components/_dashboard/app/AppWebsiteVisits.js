import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import DataTable from 'react-data-table-component';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, CardHeader, Box, FormControl, NativeSelect, InputBase, LinearProgress } from '@mui/material';
import moment from 'moment';
import { makeStyles, withStyles, } from '@mui/styles'

//
import { BaseOptionChart } from '../../charts';
import axios from 'axios';


// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Team A',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  },
  {
    name: 'Team B',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  },
  {
    name: 'Team C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }
];

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);


const columns = [
  {
    name: 'Day/Time',
    selector: 'timestamps',
    format: (row) => moment(row.Time).format('dddd, MMMM Do YYYY, h:mm:ss a'),
    sortable: true
  },

  {
    name: 'Forecast',
    selector: 'allforcasts',
    sortable: true,

  },


];

export default function AppWebsiteVisits() {

  // const classes = useStyles();
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const [loading, setLoading] = useState(true);
  const [repo, setRepo] = useState([]);
  const { title, tguser } = useParams();
  const [coin, setCoin] = useState('');
  const [messageCount, setMessageCount] = useState([]);
  const [time, setTime] = useState([]);
  const [newDateArray, setNewDateArray] = useState([]);
  const [filterText, setFilterText] = React.useState('');
  const [age, setAge] = useState();
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const requestOptions = {
    headers: {
      'x-rapidapi-key': '3fb1567f7emshe2cdf5abfb24d6dp16c241jsn7b4cea75e33e',
      // Authorization: `Bearer ${token}`
    },
    redirect: 'follow'
  };
  axios.defaults.headers.common = {
    "X-API-Key": "3fb1567f7emshe2cdf5abfb24d6dp16c241jsn7b4cea75e33e",
  };

  const fetchcoin = async () => {
    setLoading(true);
    const response = await axios
      .get(
        "https://cryptorch.p.rapidapi.com/api/v2?crypto=ETH&period=40&history=10000",

        requestOptions
      )
      .catch((err) => {
        // console.log('Err: ', err);
      });
    // const details = response.data;
    console.log(response.data);
    // console.log(response.data.concat());

    // console.log(response.data.messages)

    if (response != null) {
      var array1 = response.data.forecast
      var forcast = JSON.parse("[" + response.data.forecast + "]")
      var timestamp = JSON.parse("[" + response.data.timestamp + "]")
      console.log(flatten(forcast));
      console.log(flatten(timestamp));

      var items = flatten(timestamp).map((forcasts, index) => {
        return {

          allforcasts: flatten(forcast)[index],
          timestamps: flatten(timestamp)[index]
        }
      });
      console.log(items)
      // var crypto = []
      // var obj = {}
      // obj['forecast'] = flatten(forcast)
      // obj['timestamp'] = flatten(timestamp)
      // crypto.push(obj)
      // console.log(crypto)


      setRepo(items);

    }

    setLoading(false);
  };


  const days = async (event, shillers) => {
    // console.log( event.target.value)
  };

  useEffect(() => {
    fetchcoin();
  }, [])




  const handleChange = async (event, shillers) => {
    setAge(event.target.value);
    // handleChangepost
    setLoading(true);
    const newAge = event.target.value
    console.log(newAge)
    const response = await axios

      .get(
        `https://cryptorch.p.rapidapi.com/api/v2?crypto=${newAge}&period=40&history=10000`,

        requestOptions
      )
      .catch((err) => {
        // console.log('Err: ', err);
      });
    // const details = response.data;
    console.log(response.data);
    // console.log(response.data.concat());

    // console.log(response.data.messages)

    if (response != null) {
      var array1 = response.data.forecast
      var forcast = JSON.parse("[" + response.data.forecast + "]")
      var timestamp = JSON.parse("[" + response.data.timestamp + "]")
      console.log(flatten(forcast));
      console.log(flatten(timestamp));

      var items = flatten(timestamp).map((forcasts, index) => {
        return {

          allforcasts: flatten(forcast)[index],
          timestamps: flatten(timestamp)[index]
        }
      });
      console.log(items)
      // var crypto = []
      // var obj = {}
      // obj['forecast'] = flatten(forcast)
      // obj['timestamp'] = flatten(timestamp)
      // crypto.push(obj)
      // console.log(crypto)


      setRepo(items);

    }

    setLoading(false);


  }












  function flatten(ary) {
    var ret = [];
    for (var i = 0; i < ary.length; i++) {
      if (Array.isArray(ary[i])) {
        ret = ret.concat(flatten(ary[i]));
      } else {
        ret.push(ary[i]);
      }
    }
    return ret;
  }

  function setID(item, index) {
    var fullname = "id: " + item;
    return fullname;
  }

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: [
      '01/01/2003',
      '02/01/2003',
      '03/01/2003',
      '04/01/2003',
      '05/01/2003',
      '06/01/2003',
      '07/01/2003',
      '08/01/2003',
      '09/01/2003',
      '10/01/2003',
      '11/01/2003'
    ],
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title={`Today  ${date}`} subheader="(+43%) than last year"

        action={
          <FormControl >
            <NativeSelect
              defaultValue={'BTC'}
              id="demo-customized-select-native"
              value={coin}
              onChange={(days, handleChange)}
              input={<BootstrapInput />}
            // onClose={handleChangepost}
            >
              {/* <option aria-label="7days" value={"7d"} /> */}
              <option value={'BTC'}>BTC</option>
              <option value={'ETH'}>ETH</option>
              {/* <option value={'year'}>year</option> */}
            </NativeSelect>
          </FormControl>
        }

      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        {
          loading == true ? (<LinearProgress />) : (
            <>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 800 }}>
                  <DataTable
                    columns={columns}
                    data={repo}
                    // progressPending={loading}
                    pagination
                    highlightOnHover
                    pointerOnHover
                  // paginationServer
                  // progressComponent={<LinearIndeterminate />}
                  // onRowClicked={handleRowClicked}
                  // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                  // subHeader
                  // subHeaderComponent={subHeaderComponentMemo}
                  // persistTableHead
                  // onChangeRowsPerPage={handlePerRowsChange}
                  // onChangePage={handlePageChange}
                  />
                </Box>
              </PerfectScrollbar>

            </>




          )
        }


      </Box>
    </Card>
  );

}