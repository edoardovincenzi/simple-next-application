import { IIntervalData } from './../model/index';
import { useEffect, useState } from 'react';
import { APIBASEURL } from '../constant';
import { useQuery } from '@tanstack/react-query';
import { axiosCall } from '../utility/costant';
import { ICountries, IGetLatLong, IStatistics } from '../model';
import axios from 'axios';
import { getYearMonthDay_FromData } from '../utility';

export const useGetCountries = () => {
  const { isLoading, data, error } = useQuery(
    ['useGetCountries'],
    async (): Promise<ICountries> => {
      return await (
        await axiosCall.get(`countries.json`)
      ).data;
    }
  );
  return { isLoading, data, error };
};

export const useGetLastSixMonths_country = (country: string) => {
  const dateNow: Date = new Date(Date.now());
  const endMonth = dateNow.getMonth() + 2;
  const startMonth =
    endMonth - 6 <= -1 ? 12 - (endMonth - 6) * -1 : endMonth - 6;
  const endYear = dateNow.getFullYear();
  const startYear =
    endMonth - 6 <= -1 ? dateNow.getFullYear() - 1 : dateNow.getFullYear();
  const { isLoading, error, data } = useQuery(
    ['useGetLastSixMonths_country', country],
    async (): Promise<IStatistics[]> => {
      return await (
        await axiosCall.get(
          `carbonmonoxide/statistics.json?country=${country}&interval=month&begin=${startYear}-${startMonth}-01&end=${endYear}-${endMonth}-25&limit=6&offset=0`
        )
      ).data;
    },
    {
      enabled: Boolean(country),
    }
  );

  return { isLoading, data, error };
};

export const useGetDataAdvance_country_data_interval = (
  country: string,
  inteval: IIntervalData,
  dateFrom: Date,
  dateTo: Date,
  enabled_data: boolean
) => {
  const {
    day: dayFROM,
    month: monthFROM,
    year: yearFROM,
  } = getYearMonthDay_FromData(dateFrom);
  const {
    day: dayTO,
    month: monthTO,
    year: yearTO,
  } = getYearMonthDay_FromData(dateTo);
  const { isLoading, error, data } = useQuery(
    ['useGetLastSixMonths_country', country, inteval, dateFrom, dateTo],
    async (): Promise<IStatistics[]> => {
      return await (
        await axiosCall.get(
          `carbonmonoxide/statistics.json?country=${country}&interval=${inteval}&begin=${yearFROM}-${monthFROM}-${dayFROM}&end=${yearTO}-${monthTO}-${dayTO}&limit=100&offset=0`
        )
      ).data;
    },
    {
      enabled: enabled_data,
    }
  );

  return { isLoading, data, error };
};

export const useGetLatLong_city = (city: string) => {
  const { isLoading, error, data, isFetching } = useQuery(
    ['useGetLatLong_city', city],
    async (): Promise<IGetLatLong | string> => {
      return await (
        await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${process.env.NEXT_PUBLIC_API_KEY}&no_annotations=1&language=it`,
          {
            headers: {
              'Content-type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
      ).data;
    },
    {
      enabled: Boolean(city),
    }
  );

  return { isLoading, data, error, isFetching };
};
