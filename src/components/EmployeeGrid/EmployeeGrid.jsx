import React, { useMemo, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { Download } from 'lucide-react';

ModuleRegistry.registerModules([AllCommunityModule]);

import { Button } from '../common/Button';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { 
  NameRenderer, 
  DepartmentRenderer, 
  StatusRenderer, 
  PerformanceRenderer,
  SkillsRenderer
} from './GridRenderers';

export const EmployeeGrid = ({ rowData, searchValue, isDarkMode }) => {
  const gridRef = useRef();

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    minWidth: 100,
    flex: 1
  }), []);

  const columnDefs = useMemo(() => [
    { 
      headerName: 'Employee',
      valueGetter: p => `${p.data.firstName} ${p.data.lastName}`,
      cellRenderer: NameRenderer,
      minWidth: 220,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    { field: 'email', minWidth: 200 },
    { 
      field: 'department', 
      cellRenderer: DepartmentRenderer,
      filter: 'agTextColumnFilter'
    },
    { field: 'position', minWidth: 180 },
    { 
      field: 'salary',
      valueFormatter: p => formatCurrency(p.value),
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'performanceRating', 
      headerName: 'Performance',
      cellRenderer: PerformanceRenderer,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'skills', 
      cellRenderer: SkillsRenderer,
      filter: false,
      sortable: false,
      minWidth: 200
    },
    { field: 'location' },
    { 
      field: 'hireDate',
      headerName: 'Hire Date',
      valueFormatter: p => formatDate(p.value),
      filter: 'agDateColumnFilter'
    },
    { 
      field: 'isActive', 
      headerName: 'Status',
      cellRenderer: StatusRenderer,
      filter: 'agTextColumnFilter',
      maxWidth: 120
    }
  ], []);

  const onExportClick = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  // Sync external search with ag-grid quick filter
  React.useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.setGridOption('quickFilterText', searchValue);
    }
  }, [searchValue]);

  const themeClass = isDarkMode ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

  return (
    <div className="grid-wrapper">
      <div className="grid-header">
        <div className="grid-title">Employee Directory</div>
        <div className="grid-actions">
          <Button variant="outline" onClick={onExportClick} icon={<Download size={16} />}>
            Export CSV
          </Button>
        </div>
      </div>
      <div className={`${themeClass} flex-1 w-full h-full`} style={{ flex: 1 }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          animateRows={true}
          suppressCellFocus={true}
          domLayout="normal"
        />
      </div>
    </div>
  );
};
