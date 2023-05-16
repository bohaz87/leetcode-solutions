type City = City[];

function destCity(paths: string[][]): string {
  const cities = {} as {
    [city: string]: City;
  };

  paths.forEach((path) => {
    const [from, to] = path;
    const fromCity = (cities[from] = cities[from] || []);
    const toCity = (cities[to] = cities[to] || []);
    fromCity.push(toCity);
  });
  console.log(cities);

  for (const cname in cities) {
    const city = cities[cname];
    if (city.length === 0) {
      return cname;
    }
  }
  return "";
}

console.log(
  destCity([
    ["London", "New York"],
    ["New York", "Lima"],
    ["Lima", "Sao Paulo"],
  ])
);
