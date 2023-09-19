import { useState, useEffect } from 'react';
import { Tab } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';
import { TabList, TabContext } from '@mui/lab';
import { routesMapping } from '../router/routesMapping';
import { capitalizeStrBySplit } from '../Utils';

export default function MainLayout() {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(routesMapping[0].path);

  const onTabChange = (e, changeTabIndex) => setTabIndex(changeTabIndex);

  useEffect(() => {
    navigate(tabIndex);
  }, [tabIndex]);

  return (
    <TabContext value={tabIndex}>
      <TabList onChange={onTabChange}>
        {routesMapping?.map((routeProps) => {
          const { path } = routeProps;

          return (
            <Tab key={path} label={capitalizeStrBySplit(path)} value={path} />
          );
        })}
      </TabList>
      <Outlet />
    </TabContext>
  );
}
