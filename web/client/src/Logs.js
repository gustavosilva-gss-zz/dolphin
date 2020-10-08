import React from "react";
import MaterialTable from "material-table";

class Logs extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        const socket = this.props.socket;

        socket.on("newLog", data => {
            for (let log of data) {
                log["timestamp"] = new Date(log["timestamp"]).toLocaleString();
                log["duration"] = parseFloat(log["duration"] / 1000).toFixed(2) + " seconds";
            }

            this.setState({ data: data })
        });
    }

    render() {
        const { data } = this.state;

        const columns = [
            {
                title: "Timestamp",
                field: "timestamp",
            },
            {
                title: "Duration",
                field: "duration",
            },
            {
                title: "Image",
                filed: "image",
                render: rowData => <img src={`data:image/jpeg;base64,${rowData.image}`} style={{ width: 100 }} />
            }
        ];

        return (
            <>
                <MaterialTable
                    title="Infringement Logs"
                    data={data}
                    columns={columns}
                    options={{
                        search: true,
                        paging: false,
                        exportButton: true
                    }}
                    onRowClick={(event, rowData, togglePanel) => togglePanel()}
                    detailPanel={[
                        {
                            tooltip: 'Show Image',
                            render: rowData => {
                                return (
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '25%'
                                        }}
                                    >
                                        <img src={`data:image/jpeg;base64,${rowData.image}`} />
                                    </div>
                                )
                            },
                        },
                    ]}
                />
            </>
        );
    };
}

export default Logs;