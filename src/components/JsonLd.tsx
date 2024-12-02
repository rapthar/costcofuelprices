import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StationData } from '../types';

interface JsonLdProps {
  type: 'Station' | 'StateList' | 'CityList';
  data: any;
}

const JsonLd: React.FC<JsonLdProps> = ({ type, data }) => {
  const generateStationSchema = (station: StationData) => ({
    '@context': 'https://schema.org',
    '@type': 'GasStation',
    name: `Costco ${station['Store Name']}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: station.Address,
      addressLocality: station.City,
      addressRegion: station['State Full'],
      postalCode: station.Zipcode,
      addressCountry: station.Country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: station.Latitude,
      longitude: station.Longitude
    },
    telephone: station.Phone,
    openingHours: station.Hours,
    priceRange: '$$',
    hasMap: `https://www.google.com/maps?q=${station.Latitude},${station.Longitude}`
  });

  const generateSchema = () => {
    switch (type) {
      case 'Station':
        return generateStationSchema(data);
      case 'StateList':
        return {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: data.map((station: StationData, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: generateStationSchema(station)
          }))
        };
      default:
        return null;
    }
  };

  const schema = generateSchema();
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default JsonLd;